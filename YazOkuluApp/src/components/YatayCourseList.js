import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from '../api/axios';

const YatayCourseList = ({ departmentId, semester }) => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (departmentId && semester) {
      axios
        .get(`/YgCourse/ByDepartment/${departmentId}`)
        .then((res) => {
          const filtered = res.data.filter((c) => c.semester <= parseInt(semester));
          setCourses(filtered);
        })
        .catch((err) => {
          console.error('Dersler alınamadı:', err);
        });
    }
  }, [departmentId, semester]);

  if (!courses.length) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.toggleCard}>
        <Text style={styles.subHeader}>📚 Ders Listesi ({courses.length} ders)</Text>
      </TouchableOpacity>

      {expanded && (
        <ScrollView
          style={styles.scrollWrapper}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true} // 📌 BU ÖNEMLİ!
        >
          {courses.map((course, index) => (
            <View key={index} style={styles.courseCard}>
              <Text style={styles.courseTitle}>
                {course.courseCode} - {course.courseName}
              </Text>
              <Text style={styles.courseInfo}>
                Kredi: {course.credit} | AKTS: {course.akts}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleCard: {
    backgroundColor: '#096B68',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  scrollWrapper: {
    maxHeight: 300,
    backgroundColor: '#e6f2f1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#096B68',
  },
  scrollContent: {
    padding: 10,
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#90D1CA',
  },
  courseTitle: {
    fontWeight: 'bold',
    color: '#096B68',
    fontSize: 15,
  },
  courseInfo: {
    color: '#555',
    fontSize: 13,
    marginTop: 2,
  },
  subHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YatayCourseList;
