// components/ChatDrawerMobile.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from '../api/axios';

const ChatDrawerMobile = ({
  visible,
  onClose,
  unmatchedCourses,
  selectedUniversity,
  selectedDepartment,
  selectedSemester,
}) => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      handleChatbotQuery();
    }
  }, [visible]);

  const handleChatbotQuery = async () => {
    if (!unmatchedCourses?.length || !selectedUniversity || !selectedDepartment || !selectedSemester) {
      setChat([{ sender: 'bot', text: 'Eksik bilgi: Chatbot analizi yapılamıyor.' }]);
      return;
    }

    const universityName = selectedUniversity.name;
    const departmentName = selectedDepartment.name;
    const semester = parseInt(selectedSemester);
    const departmentId = selectedDepartment.id;

    const requestBody = {
      university: universityName,
      department: departmentName,
      semester,
      departmentId,
      unmatchedCourses: unmatchedCourses.map(
        (c) => `${c.courseCode} - ${c.courseName}`
      ),
    };

    setLoading(true);
    setChat([{ sender: 'bot', text: '🔎 Chatbot analiz yapıyor, lütfen bekleyin...' }]);

    try {
      const response = await axios.post('/chatbot/final-review', requestBody);
      const botText = response.data.response;
      setChat([{ sender: 'bot', text: botText }]);
    } catch (error) {
      console.error('Chatbot hatası:', error?.response?.data || error.message);
      setChat([{ sender: 'bot', text: '❌ Chatbot cevabı alınamadı.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🤖 SummerSchool Asistan</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>✖</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatArea}>
          {chat.map((item, index) => (
            <View
              key={index}
              style={item.sender === 'user' ? styles.userBubble : styles.botBubble}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        {loading && (
          <View style={{ marginTop: 8 }}>
            <ActivityIndicator color="#408E91" />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#526D82',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  close: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  chatArea: {
    flex: 1,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#408E91',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#354A5F',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ChatDrawerMobile;
