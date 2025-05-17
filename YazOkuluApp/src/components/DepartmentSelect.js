import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Modal, FlatList, View, StyleSheet } from 'react-native';
import axios from '../api/axios';
import Icon from 'react-native-vector-icons/Ionicons';

const DepartmentSelect = ({ facultyId, selectedDepartment, onSelect }) => {
  const [departments, setDepartments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!facultyId) return;
    axios.get('/Department').then(res => {
      const filtered = res.data.filter(d => d.faculty_id === parseInt(facultyId));
      setDepartments(filtered);
    });
  }, [facultyId]);

  return (
    <>
      <Text style={styles.label}>Bölüm</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
        disabled={!facultyId}
      >
        <Text style={styles.selectText}>
          {selectedDepartment?.name || 'Bölüm Seçin'}
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
              data={departments}
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

export default DepartmentSelect;
