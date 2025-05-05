import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext'; // Kullanıcıyı al

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Giriş yapan kullanıcı

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hoş geldin, {user?.fullName || 'Kullanıcı'} 👋</Text>
      <Text style={styles.title}>Yaz Okulu Platformu</Text>

      <TouchableOpacity
        style={[styles.card, styles.cardYazOkulu]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('YazOkulu')}
      >
        <Text style={styles.cardTitle}>📘 Yaz Okulu</Text>
        <Text style={styles.cardDesc}>Açılan dersleri keşfet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.cardYatayGecis]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('YatayGecis')}
      >
        <Text style={styles.cardTitle}>🔁 Yatay Geçiş</Text>
        <Text style={styles.cardDesc}>Ders denkliğini kontrol et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4b4b9f',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3a3a8f',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },
  cardYazOkulu: {
    backgroundColor: '#e0f0ff', // Açık mavi
  },
  cardYatayGecis: {
    backgroundColor: '#fff3e0', // Açık turuncu
  },
});
