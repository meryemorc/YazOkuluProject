import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation/AppNavigator';
import axios from '../api/axios'; // ✅ axios importu

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    console.log('Login butonuna basıldı!');

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
  console.log('Giriş başarılı. Token:', token);

  Alert.alert('Başarılı', 'Giriş başarılı!');
  
  // ✅ İşte tam buraya ekle
  navigation.navigate('Home');
 } catch (err: any) {
      console.error('Login error:', err?.response?.data || err.message);
      Alert.alert('Hata', 'Giriş başarısız. Bilgileri kontrol edin.');
    }
  };


   return (
    <LinearGradient
      colors={['#0f172a', '#0e1525']}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Giriş Yap</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
          navigation.navigate('Home');

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 🔁 dikeyde ortalamak için
    alignItems: 'center',     // ↔️ yatayda ortalamak için
    backgroundColor: '#1e293b', // lacivert zemin (Tailwind bg-slate-900)
  },
  form: {
    backgroundColor: '#1e293b', // koyu lacivert kart (Tailwind bg-slate-800)
    width: '90%',
    maxWidth: 360,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#334155', // input arkaplanı (Tailwind bg-slate-700)
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ca8a04', // lacivert buton (Tailwind blue-700)
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  bottomLink: {
    color: '#ca8a04', // mavi link (Tailwind sky-400)
    fontWeight: 'bold',
  },
});


export default LoginScreen;
