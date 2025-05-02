// 📄 /screens/YazOkuluScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YazOkuluScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yaz Okulu Modülü</Text>
      <Text style={styles.subtitle}>Buradan yaz okulu derslerini görüntüleyebilir ve başvuru yapabilirsin.</Text>
    </View>
  );
};

export default YazOkuluScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5e60ce',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
  }
});
