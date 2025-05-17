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
import styles from '../styles/LoginScreenStyles';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const response = await axios.post('Auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      setIsLoggedIn(true);
      Alert.alert('Başarılı', 'Giriş başarılı!');
      navigation.replace('Home');

    } catch (err) {
      console.error('Login error:', err?.response?.data || err.message);
      Alert.alert('Hata', 'Giriş başarısız. Bilgileri kontrol edin.');
    }
  };

  return (
    <LinearGradient colors={['#096B68', '#90D1CA']} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Giriş Yap</Text>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Hesabın yok mu?{' '}
          <Text
            style={styles.bottomLink}
            onPress={() => navigation.navigate('Register')}
          >
            Kayıt ol
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
