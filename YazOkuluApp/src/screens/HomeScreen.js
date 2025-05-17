import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/HomeScreenStyles';
import axios from '../api/axios';

const HomeScreen = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  const handleRedirect = (target) => {
    navigation.navigate(target);
  };

  return (
    <LinearGradient colors={['#096B68', '#129990']} style={styles.container}>
      <Text style={styles.title}>Yaz Okulu Uygulamasına Hoş Geldiniz</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRedirect('YazOkulu')}
      >
        <Text style={styles.buttonText}>Yaz Okulu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRedirect('YatayGecis')}
      >
        <Text style={styles.buttonText}>Yatay Geçiş</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsLoggedIn(false); // çıkış yap
          navigation.replace('Login');
        }}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default HomeScreen;
