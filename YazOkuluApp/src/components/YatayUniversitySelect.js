import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import axios from '../api/axios';
import Icon from 'react-native-vector-icons/Ionicons';

const UniversitySelect = ({ selectedUniversity, onSelect }) => {
  const [universities, setUniversities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('/YgUniversity') // ❗️ API endpoint senin backend'de neyse onu yaz
      .then(res => setUniversities(res.data))
      .catch(err => console.error('Üniversiteler alınamadı:', err));
  }, []);

  return (
    <>
      <Text style={styles.label}>Üniversite</Text>
      <TouchableOpacity style={styles.selectBox} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectText}>
          {selectedUniversity?.name || 'Üniversite Seçin'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={22} color="#333" />
            </TouchableOpacity>

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
    color: '#096B68', // yeşilimsi etiket
    marginBottom: 6,
    fontWeight: 'bold',
  },
  selectBox: {
    backgroundColor: '#f1f5f9',   // açık gri
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#096B68',       // yeşil kenarlık
  },
  selectText: {
    color: '#096B68',             // yazı da yeşil tonlu
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 400,
    padding: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});



export default UniversitySelect;
