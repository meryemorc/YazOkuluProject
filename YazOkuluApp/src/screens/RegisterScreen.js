import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from '../api/axios';
import styles from '../styles/RegisterScreenStyles'; // Stil dosyasını ayrı hale getirdik

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Uyarı', 'Tüm alanları doldurun.');
      return;
    }

    try {
      const response = await axios.post('Auth/register', {
        name,
        email,
        password,
      });

      console.log('Kayıt başarılı:', response.data);
      Alert.alert('Başarılı', 'Kayıt başarılı! Giriş yapabilirsiniz.');
      navigation.navigate('Login');

    } catch (err) {
      console.error('Register error:', err?.response?.data || err.message);
      Alert.alert('Hata', 'Kayıt başarısız. Bilgileri kontrol edin.');
    }
  };

  return (
    <LinearGradient colors={['#096B68', '#90D1CA']} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Kayıt Ol</Text>

        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          placeholderTextColor="#555"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Zaten hesabın var mı?{' '}
          <Text style={styles.bottomLink} onPress={() => navigation.navigate('Login')}>
            Giriş yap
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
