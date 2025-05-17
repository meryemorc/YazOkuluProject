import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import axios from '../api/axios';
import Icon from 'react-native-vector-icons/Ionicons';

const UniversitySelect = ({ selectedUniversity, onSelect }) => {
  const [universities, setUniversities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('/Universities')
      .then(res => setUniversities(res.data))
      .catch(err => console.error('Üniversiteler alınamadı:', err));
  }, []);

  return (
    <>
      <Text style={styles.label}>Üniversite</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>
          {selectedUniversity?.name || 'Üniversite Seçin'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            {/* Sağ üst çarpı butonu */}
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close-outline" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Üniversite Seç</Text>

            <FlatList
              data={universities}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  selectBox: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectText: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 400,
    padding: 20,
    paddingTop: 36, // Çarpı butonuna boşluk bırakıyoruz
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 4,
  },
});

export default UniversitySelect;
