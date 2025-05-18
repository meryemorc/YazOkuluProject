import React, { useState, useEffect } from 'react';
import {View,Text,ScrollView,TextInput,TouchableOpacity,RefreshControl,} from 'react-native';
import axios from '../api/axios';
import { useNavigation } from '@react-navigation/native';
import UniversitySelect from '../components/UniversitySelect';
import FacultySelect from '../components/FacultySelect';
import DepartmentSelect from '../components/DepartmentSelect';
import styles from '../styles/YazOkuluScreenStyles';
import ChatDrawerMobile from '../components/ChatDrawerMobile';


const YazOkuluScreen = () => {
const navigation = useNavigation();
  const [chatVisible, setChatVisible] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (selectedDepartment) {
      axios.get('/Course').then(res => {
        const filtered = res.data.filter(c => c.department_id === selectedDepartment.id);
        setCourses(filtered);
      });
    }
  }, [selectedDepartment]);

  const handleRefresh = () => {
    setRefreshing(true);
    if (selectedDepartment) {
      axios.get('/Course')
        .then(res => {
          const filtered = res.data.filter(c => c.department_id === selectedDepartment.id);
          setCourses(filtered);
          setRefreshing(false);
        })
        .catch(() => setRefreshing(false));
    } else {
      setRefreshing(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    axios.get('/Course').then(res => {
      const term = searchTerm.toLowerCase();
      const matched = res.data.filter(
        c =>
          c.course_name.toLowerCase().includes(term) ||
          c.course_code.toLowerCase().includes(term)
      );
      setCourses(matched);
    });
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#5DB996']} />
      }
    >
      <Text style={styles.title}>Yaz Okulu Başvurusu</Text>

      <UniversitySelect
        selectedUniversity={selectedUniversity}
        onSelect={setSelectedUniversity}
      />
      <FacultySelect
        universityId={selectedUniversity?.id}
        selectedFaculty={selectedFaculty}
        onSelect={setSelectedFaculty}
      />
      <DepartmentSelect
        facultyId={selectedFaculty?.id}
        selectedDepartment={selectedDepartment}
        onSelect={setSelectedDepartment}
      />

      <Text style={styles.label}>Ders Ara</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ders adı ya da kodu..."
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Ara</Text>
        </TouchableOpacity>
      </View>

      {courses.length === 0 ? (
        <Text style={{ color: '#096B68', textAlign: 'center', marginTop: 20 }}>
          Hiç ders bulunamadı.
        </Text>
      ) : (
        <View style={styles.courseList}>
          {courses.map(course => (
            <View key={course.id} style={styles.courseCard}>
              <Text style={styles.courseTitle}>{course.course_name}</Text>
              <Text style={styles.courseInfo}>Kod: {course.course_code}</Text>
              <Text style={styles.courseInfo}>
                Kredi: {course.kredi} / AKTS: {course.akts}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ marginTop: 30, marginBottom: 40, alignItems: 'center' }}>
        
      </View>
    </ScrollView>
    <TouchableOpacity
  onPress={() => setChatVisible(true)}
  style={styles.floatingChatButton}
>
  <Text style={styles.floatingChatIcon}>🤖</Text>
</TouchableOpacity>

<ChatDrawerMobile
  visible={chatVisible}
  onClose={() => setChatVisible(false)}
/>

    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={styles.floatingHomeButton}
    >
  <Text style={styles.floatingHomeIcon}>🏠</Text>
</TouchableOpacity>
</View>
  );
};

export default YazOkuluScreen;
