import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

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
        // navigation.navigate('Home'); // varsa yönlendirme
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
      <Button title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10
  }
});
