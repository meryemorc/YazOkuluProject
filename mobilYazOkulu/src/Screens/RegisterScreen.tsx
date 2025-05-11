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
import axios from '../api/axios'; // ✅ axios import

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

    } catch (err: any) {
      console.error('Register error:', err?.response?.data || err.message);
      Alert.alert('Hata', 'Kayıt başarısız. Bilgileri kontrol edin.');
    }
  };

    return (
    <LinearGradient
      colors={['#0f172a', '#0e1525']}
      style={styles.container}
    >
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
          <Text
            style={styles.bottomLink}
            onPress={() => navigation.navigate('Login')}
          >
            Giriş yap
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  form: {
    backgroundColor: '#1e293b',
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
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ca8a04',
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
    color: '#ca8a04',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
