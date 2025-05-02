import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5275/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Başarılı", "Giriş başarılı!");
        navigation.navigate('Home'); // Başarılı giriş sonrası Home ekranına yönlendirme
      } else {
        Alert.alert("Hata", "E-posta veya şifre hatalı.");
      }
    } catch (error) {
      Alert.alert("Sunucu Hatası", "API'ye ulaşılamıyor.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Hesabın yok mu? Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backText}>← Ana Sayfa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  button: {
    backgroundColor: '#5e60ce',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  registerText: {
    marginTop: 10,
    color: '#007bff',
    textAlign: 'center'
  },
  backText: {
    marginTop: 5,
    color: 'gray',
    textAlign: 'center'
  }
});
