import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import axios from '../api/axios';
import Icon from 'react-native-vector-icons/Ionicons';

const YatayFacultySelect = ({ universityId, selectedFaculty, onSelect }) => {
  const [faculties, setFaculties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  if (universityId) {
    axios.get('/YgFaculty')
      .then(res => {
        const filtered = res.data.filter(f => f.universityId === universityId);
        setFaculties(filtered);
      })
      .catch(err => console.error('Fakülteler alınamadı:', err));
  }
}, [universityId]);


  return (
    <>
      <Text style={styles.label}>Fakülte</Text>

<TouchableOpacity
  style={[
    styles.selectBox,
    !universityId && { backgroundColor: '#ccc' }
  ]}
  onPress={() => {
    console.log("Tıklandı! Fakülteler:", faculties.length);
    setModalVisible(true);
  }}
  disabled={!universityId}
>
  <Text style={styles.selectText}>
    {selectedFaculty?.name || 'Fakülte Seçin'}
  </Text>
</TouchableOpacity>


      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={22} color="#333" />
            </TouchableOpacity>

            <FlatList
              data={faculties}
              keyExtractor={item => item.id.toString()}
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
    color: '#096B68',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  selectBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#096B68',
  },
  selectText: {
    color: '#096B68',
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
    backgroundColor: '#ffffff',
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
    borderBottomColor: '#eee',
  },
});



export default YatayFacultySelect;
