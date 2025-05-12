import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation/AppNavigator';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRedirect = async (target: 'YazOkulu' | 'YatayGecis') => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate(target);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <LinearGradient colors={['#12446A', '#0f172a']} style={styles.container}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ca8a04',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
