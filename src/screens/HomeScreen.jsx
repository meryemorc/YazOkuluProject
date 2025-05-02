// 📄 /screens/HomeScreen.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hoş Geldin, Kullanıcı!</Text>
      
      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('YazOkulu')}>
          <Text style={styles.cardTitle}>Yaz Okulu</Text>
          <Text style={styles.cardDescription}>Yaz okulu derslerini incele ve başvur.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('YatayGecis')}>
          <Text style={styles.cardTitle}>Yatay Geçiş</Text>
          <Text style={styles.cardDescription}>Yatay geçiş ile ilgili işlemleri yap.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#5e60ce',
    padding: 30,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5, // Android için gölge
    shadowColor: '#000', // iOS için gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8
  },
  cardDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center'
  }
});
