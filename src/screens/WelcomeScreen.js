import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yaz Okulu Platformu</Text>
      <Text style={styles.subtitle}>Hoş Geldiniz 👋</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#555'
  },
  button: {
    backgroundColor: '#5e60ce',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
