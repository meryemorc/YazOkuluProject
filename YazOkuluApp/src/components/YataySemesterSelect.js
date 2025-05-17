import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import axios from '../api/axios';
import Icon from 'react-native-vector-icons/Ionicons';

const YataySemesterSelect = ({ departmentId, selectedSemester, onSelect }) => {
  const [semesters, setSemesters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  if (departmentId) {
    console.log("📡 Dönem çekiliyor, departmentId:", departmentId);

    axios.get(`/YgCourse/SemesterCount/${departmentId}`)
      .then(res => {
        const maxSemester = res.data;
        const list = Array.from({ length: maxSemester }, (_, i) => i + 1);
        setSemesters(list);
        console.log("✅ Dönemler geldi:", list);
      })
      .catch(err => {
        console.error("❌ Dönem alınamadı:", err);
        setSemesters([]);
      });
  } else {
    setSemesters([]);
  }
}, [departmentId]);


  return (
    <>
      <Text style={styles.label}>Dönem (Sınıf)</Text>

      <TouchableOpacity
        style={[
          styles.selectBox,
          !departmentId && { backgroundColor: '#ccc' },
        ]}
        onPress={() => {
          console.log('👆 Touchable tıklandı. Dönem sayısı:', semesters.length);
          setModalVisible(true);
        }}
        disabled={!departmentId}
      >
        <Text style={styles.selectText}>
          {selectedSemester ? `${selectedSemester}. Dönem` : 'Dönem Seçin'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={22} color="#333" />
            </TouchableOpacity>

            <FlatList
              data={semesters}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item}. Dönem</Text>
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

export default YataySemesterSelect;
