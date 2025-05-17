import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker from '@react-native-documents/picker';
import axios from '../api/axios';

import YatayUniversitySelect from '../components/YatayUniversitySelect';
import YatayFacultySelect from '../components/YatayFacultySelect';
import YatayDepartmentSelect from '../components/YatayDepartmentSelect';
import YataySemesterSelect from '../components/YataySemesterSelect';
import YatayCourseList from '../components/YatayCourseList';
import styles from '../styles/YatayGecisScreenStyles';

const YatayGecisScreen = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [matchedCourses, setMatchedCourses] = useState([]);
  const [unmatchedCourses, setUnmatchedCourses] = useState([]);

  const pickPDF = async () => {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
      copyTo: 'documentDirectory', // bazı Android sürümlerinde zorunlu
    });

    if (result?.uri) {
      setTranscript(result);
      console.log("📄 Seçilen PDF:", result);
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log("İptal edildi.");
    } else {
      console.error("PDF seçme hatası:", err);
      Alert.alert("Hata", "PDF seçilirken bir sorun oluştu.");
    }
  }
};


  const handleUpload = async () => {
  if (!transcript || !selectedDepartment?.id || !selectedSemester) {
    Alert.alert("Uyarı", "Lütfen transkript, bölüm ve dönem seçin.");
    return;
  }

  const formData = new FormData();
  formData.append("file", {
    uri: transcript.fileCopyUri || transcript.uri, // 💡 en güvenlisi bu
    name: transcript.name || "transcript.pdf",
    type: transcript.type || "application/pdf",
  });
  formData.append("departmentId", selectedDepartment.id);
  formData.append("semester", selectedSemester);

  try {
    const response = await axios.post("/Transcript/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { matched, unmatched } = response.data;
    setMatchedCourses(matched);
    setUnmatchedCourses(unmatched);
  } catch (err) {
    console.error("Upload error:", err?.response?.data || err.message);
    Alert.alert("Hata", "Eşleştirme başarısız.");
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yatay Geçiş Başvurusu</Text>

      <YatayUniversitySelect
        selectedUniversity={selectedUniversity}
        onSelect={setSelectedUniversity}
      />
      <YatayFacultySelect
        universityId={selectedUniversity?.id}
        selectedFaculty={selectedFaculty}
        onSelect={setSelectedFaculty}
      />
      <YatayDepartmentSelect
        facultyId={selectedFaculty?.id}
        selectedDepartment={selectedDepartment}
        onSelect={setSelectedDepartment}
      />
      <YataySemesterSelect
        departmentId={selectedDepartment?.id}
        selectedSemester={selectedSemester}
        onSelect={setSelectedSemester}
      />

      <YatayCourseList
        departmentId={selectedDepartment?.id}
        semester={selectedSemester}
      />

      {/* PDF seçimi */}
      <TouchableOpacity onPress={pickPDF} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>📄 PDF Yükle</Text>
      </TouchableOpacity>

      {transcript && (
        <Text style={styles.selectedFileText}>
          Seçilen dosya: {transcript.name}
        </Text>
      )}

      {/* Eşleştirme Başlat */}
      <TouchableOpacity onPress={handleUpload} style={styles.matchButton}>
        <Text style={styles.matchButtonText}>🔍 Eşleştirmeyi Başlat</Text>
      </TouchableOpacity>

      {/* Eşleşme sonuçları */}
      <View style={{ marginTop: 24 }}>
        <Text style={styles.resultHeader}>✅ Uyumlu Dersler</Text>
        {matchedCourses.length === 0 ? (
          <Text style={styles.resultEmpty}>Henüz sonuç yok.</Text>
        ) : (
          matchedCourses.map((c, index) => (
            <View key={index} style={styles.resultCardGreen}>
              <Text style={styles.resultText}>{c.courseCode} - {c.courseName}</Text>
            </View>
          ))
        )}

        <Text style={[styles.resultHeader, { marginTop: 24 }]}>❌ Uyumsuz Dersler</Text>
        {unmatchedCourses.length === 0 ? (
          <Text style={styles.resultEmpty}>Henüz sonuç yok.</Text>
        ) : (
          unmatchedCourses.map((c, index) => (
            <View key={index} style={styles.resultCardRed}>
              <Text style={styles.resultText}>{c.courseCode} - {c.courseName}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default YatayGecisScreen;
