// components/ChatDrawerMobile.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import axios from '../api/axios';

const ChatDrawerMobile = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const updatedChat = [...chat, { sender: 'user', text: message }];
    setChat(updatedChat);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/chatbot', { message });
      const reply = response.data.response;
      setChat([...updatedChat, { sender: 'bot', text: reply }]);
    } catch (error) {
      setChat([...updatedChat, { sender: 'bot', text: '❌ Cevap alınamadı.' }]);
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
            <View key={index} style={item.sender === 'user' ? styles.userBubble : styles.botBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            placeholder="Bir mesaj yaz..."
            placeholderTextColor="#aaa"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} disabled={loading} style={styles.sendButton}>
            <Text style={styles.sendText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  close: {
    fontSize: 22,
    color: '#fff',
  },
  chatArea: {
    flex: 1,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#38bdf8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#334155',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  messageText: {
    color: '#fff',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#38bdf8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ChatDrawerMobile;
