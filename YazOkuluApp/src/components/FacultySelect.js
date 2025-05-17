import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Modal, FlatList, View, StyleSheet } from 'react-native';
import axios from '../api/axios';
import Icon from 'react-native-vector-icons/Ionicons';

const FacultySelect = ({ universityId, selectedFaculty, onSelect }) => {
  const [faculties, setFaculties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!universityId) return;
    axios.get('/Faculties').then(res => {
      const filtered = res.data.filter(f => f.university_id === parseInt(universityId));
      setFaculties(filtered);
    });
  }, [universityId]);

  return (
    <>
      <Text style={styles.label}>Fakülte</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
        disabled={!universityId}
      >
        <Text style={styles.selectText}>
          {selectedFaculty?.name || 'Fakülte Seçin'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
             <TouchableOpacity
                          style={styles.closeIcon}
                          onPress={() => setModalVisible(false)}
                        >
                          <Icon name="close-outline" size={24} color="#000" />
                        </TouchableOpacity>
            <FlatList
              data={faculties}
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
  label: { fontSize: 16, marginBottom: 6, color: '#333' },
  selectBox: {
    padding: 12, backgroundColor: '#fff', borderRadius: 8,
    marginBottom: 12, borderWidth: 1, borderColor: '#ccc',
  },
  selectText: { color: '#000' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalBox: { width: '80%', backgroundColor: '#fff', borderRadius: 10, maxHeight: 400, padding: 20 },
  modalItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});

export default FacultySelect;
