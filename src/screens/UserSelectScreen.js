import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserSelectScreen = ({ navigation }) => {
  const handleSelectRole = (role) => {
    navigation.navigate('Login', { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Türünü Seçin</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('student')}>
        <Text style={styles.buttonText}>👩‍🎓 Öğrenci Girişi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('instructor')}>
        <Text style={styles.buttonText}>👨‍🏫 Öğretim Görevlisi Girişi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('admin')}>
        <Text style={styles.buttonText}>🧑‍💼 Admin Girişi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff', // açık lacivert tonlu arka plan
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1a237e', // koyu lacivert yazı
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7e57c2', // açık mor buton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
