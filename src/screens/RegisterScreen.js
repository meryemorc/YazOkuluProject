import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // varsayılan

  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5275/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password, role })
      });

      if (response.ok) {
        Alert.alert("Başarılı", "Kayıt başarılı! Giriş yapabilirsiniz.");
        navigation.navigate('Login');
      } else {
        const errorText = await response.text(); // ⬅️ burayı ekle
        Alert.alert("Hata", `Kayıt başarısız.\n\nSunucu mesajı:\n${errorText}`);
      }      
    } catch (error) {
      Alert.alert("Sunucu Hatası", "API'ye ulaşılamıyor.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput placeholder="Ad Soyad" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="E-posta" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Rol (student / assistant / admin)" value={role} onChangeText={setRole} style={styles.input} />

      <Button title="Kayıt Ol" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Zaten hesabın var mı? Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10
  },
  loginText: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center'
  },
  backText: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'center'
  }
});
