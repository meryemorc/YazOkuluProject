// 📄 /screens/YatayGecisScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YatayGecisScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yatay Geçiş Modülü</Text>
      <Text style={styles.subtitle}>Buradan yatay geçiş başvurusu yapabilir ve ders denkliğini kontrol edebilirsin.</Text>
    </View>
  );
};

export default YatayGecisScreen;

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
