import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from '@react-native-documents/picker';
import axios from '../api/axios';

import YatayUniversitySelect from '../components/YatayUniversitySelect';
import YatayFacultySelect from '../components/YatayFacultySelect';
import YatayDepartmentSelect from '../components/YatayDepartmentSelect';
import YataySemesterSelect from '../components/YataySemesterSelect';
import YatayCourseList from '../components/YatayCourseList';
import CourseResultList from '../components/CourseResultList';
import ChatDrawerMobile from '../components/ChatDrawerMobile';
import { useNavigation } from '@react-navigation/native';


import styles from '../styles/YatayGecisScreenStyles';

const YatayGecisScreen = () => {
  const navigation = useNavigation();

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [misplacedCourses, setMisplacedCourses] = useState([]);


  const [matchedCourses, setMatchedCourses] = useState([]);
  const [unmatchedCourses, setUnmatchedCourses] = useState([]);
  const [showMatched, setShowMatched] = useState(false);
  const [showUnmatched, setShowUnmatched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatbotLoading, setChatbotLoading] = useState(false);

  

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: ['application/pdf'],
      });

      if (result.length > 0) {
        setTranscript(result[0]);
        console.log("Seçilen dosya:", result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Kullanıcı iptal etti.");
      } else {
        console.error("Seçim hatası:", err);
        Alert.alert("Hata", "PDF seçilirken bir sorun oluştu.");
      }
    }
  };

  const handleUpload = async () => {
    if (!transcript || !selectedDepartment?.id || !selectedSemester) {
      Alert.alert("Uyarı", "Lütfen transkript, bölüm ve dönem seçin.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: transcript.uri,
      type: transcript.type || 'application/pdf',
      name: transcript.name || 'transcript.pdf',
    });
    formData.append("departmentId", selectedDepartment.id);
    formData.append("semester", selectedSemester);

    try {
      const response = await axios.post("/Transcript/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { matched, unmatched } = response.data;
      setMatchedCourses(matched);
      setUnmatchedCourses(unmatched);
      setShowMatched(true);
      setShowUnmatched(true);
    } catch (err) {
      console.error("Yükleme hatası:", err?.response?.data || err.message);
      Alert.alert("Hata", "Eşleştirme başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalReview = async () => {
  if (!selectedUniversity || !selectedDepartment || !selectedSemester || unmatchedCourses.length === 0) {
    Alert.alert("Eksik bilgi", "Lütfen üniversite, bölüm, dönem seçin ve eşleştirme yapın.");
    return;
  }

  setChatbotLoading(true);

  try {
    const response = await axios.post("/Chatbot/final-review", {
      university: selectedUniversity.name,
      department: selectedDepartment.name,
      semester: selectedSemester,
      departmentId: selectedDepartment.id,
      unmatchedCourses: unmatchedCourses.map(c => `${c.courseCode} - ${c.courseName}`)
    });

    const botText = response.data.response;
    const matches = botText.match(/- ([A-ZÇĞİÖŞÜ0-9]+) - (.+?)(?=\n|$)/g);

    const parsed = matches?.map(line => {
      const [code, name] = line.replace("- ", "").split(" - ");
      return { courseCode: code.trim(), courseName: name.trim() };
    }) || [];

    setMisplacedCourses(parsed);
  } catch (err) {
    console.error("Final review hatası:", err);
    Alert.alert("Chatbot analizi başarısız.");
  } finally {
    setChatbotLoading(false);
  }
};


return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yatay Geçiş Başvurusu</Text>

      <YatayUniversitySelect selectedUniversity={selectedUniversity} onSelect={setSelectedUniversity} />
      <YatayFacultySelect universityId={selectedUniversity?.id} selectedFaculty={selectedFaculty} onSelect={setSelectedFaculty} />
      <YatayDepartmentSelect facultyId={selectedFaculty?.id} selectedDepartment={selectedDepartment} onSelect={setSelectedDepartment} />
      <YataySemesterSelect departmentId={selectedDepartment?.id} selectedSemester={selectedSemester} onSelect={setSelectedSemester} />

      <YatayCourseList departmentId={selectedDepartment?.id} semester={selectedSemester} />

      <TouchableOpacity onPress={pickPDF} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>📄 PDF Yükle</Text>
      </TouchableOpacity>

      {transcript && (
        <TouchableOpacity style={styles.selectedFileCard} activeOpacity={1}>
          <Text style={styles.selectedFileText}>📄 {transcript.name}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleUpload} style={styles.matchButton} disabled={loading}>
        <Text style={styles.matchButtonText}>
          {loading ? '🔄 Eşleştiriliyor...' : '🔍 Eşleştirmeyi Başlat'}
        </Text>
      </TouchableOpacity>

      {/* Eşleşme sonuçları */}
      {matchedCourses.length > 0 && (
        <CourseResultList
          title="Uyumlu Dersler"
          icon="✅"
          color="#57A6A1"
          courses={matchedCourses}
          expanded={showMatched}
          onToggle={() => setShowMatched(!showMatched)}
        />
      )}

      {unmatchedCourses.length > 0 && (
        <CourseResultList
          title="Uyumsuz Dersler"
          icon="❌"
          color="#B8001F"
          courses={unmatchedCourses}
          expanded={showUnmatched}
          onToggle={() => setShowUnmatched(!showUnmatched)}
        />
      )}

      {unmatchedCourses.length > 0 && (
        <TouchableOpacity
          onPress={handleFinalReview}
          disabled={chatbotLoading}
          style={[
            styles.chatFinalButton,
            chatbotLoading && { opacity: 0.6 }
          ]}
        >
          <Text style={styles.chatFinalButtonText}>
            {chatbotLoading ? '⏳ Eşleştiriliyor...' : '🤖 Son Kontrol: Chatbotla Karşılaştır'}
          </Text>
        </TouchableOpacity>
      )}

      {misplacedCourses && (
        <View style={styles.yellowCard}>
          <Text style={styles.yellowCardTitle}>⚠️ Chatbot’a Göre Yanlış Eşleşmiş Dersler</Text>
          {misplacedCourses.length === 0 ? (
            <Text style={styles.yellowCardText}>Chatbot’a göre yanlış eşleşmiş ders bulunamadı.</Text>
          ) : (
            <View style={{ marginTop: 6 }}>
              {misplacedCourses.map((course, i) => (
                <Text key={i} style={styles.yellowCardText}>
                  {course.courseCode} - {course.courseName}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}

      {/* ChatDrawer */}
      <ChatDrawerMobile
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        unmatchedCourses={unmatchedCourses}
        selectedUniversity={selectedUniversity}
        selectedDepartment={selectedDepartment}
        selectedSemester={selectedSemester}
      />
    </ScrollView>

    {/* Sabit Chatbot Butonu - scroll etkilenmez */}
    <TouchableOpacity
      onPress={() => setChatVisible(true)}
      style={styles.floatingChatButton}
    >
      <Text style={styles.floatingChatIcon}>🤖</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={styles.floatingHomeButton}
    >
  <Text style={styles.floatingHomeIcon}>🏠</Text>
</TouchableOpacity>

  </View>
  
);

}
export default YatayGecisScreen;
