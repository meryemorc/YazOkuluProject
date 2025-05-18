import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CourseResultList = ({ title, icon, color, courses, expanded, onToggle }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <View style={{ marginTop: 20 }}>
      {/* Başlık Butonu */}
      <TouchableOpacity onPress={onToggle} style={[styles.headerCard, { backgroundColor: color }]}>
        <Text style={styles.headerText}>{icon} {title}</Text>
      </TouchableOpacity>

      {/* Scrollable Kart */}
      {expanded && (
        <View style={styles.cardContainer}>
          <ScrollView style={styles.scrollArea} nestedScrollEnabled>
            {courses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <Text style={styles.courseText}>{course.courseCode} - {course.courseName}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    maxHeight: 300, // içerik kayarsa scrollable olsun
  },
  scrollArea: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  courseCard: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  courseText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
});

export default CourseResultList;
