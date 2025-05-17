import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import YazOkuluScreen from '../screens/YazOkuluScreen';
import YatayGecisScreen from '../screens/YatayGecisScreen'; 

import { AuthProvider } from '../context/AuthContext'; // ✅ bunu ekle

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider> {/* ✅ tüm navigasyonu sarmalıyor */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="YazOkulu" component={YazOkuluScreen} />
          <Stack.Screen name="YatayGecis" component={YatayGecisScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
