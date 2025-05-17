import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CourseResultList = ({ title, icon, color, courses, expanded, onToggle }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity onPress={onToggle} style={[styles.toggleCard, { backgroundColor: color }]}>
        <Text style={styles.toggleText}>{icon} {title}</Text>
      </TouchableOpacity>

      {expanded && (
        <ScrollView style={styles.scrollWrapper} contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}>
          {courses.map((c, index) => (
            <View key={index} style={styles.courseCard}>
              <Text style={styles.courseText}>{c.courseCode} - {c.courseName}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleCard: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollWrapper: {
    maxHeight: 300,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 8,
  },
  scrollContent: {
    padding: 10,
  },
  courseCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  courseText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },
});

export default CourseResultList;
