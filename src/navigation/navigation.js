import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import UserSelectScreen from '../screens/UserSelectScreen';
import LoginScreen from '../screens/LoginScreen';
// Daha sonra ekleyeceğimiz ekranlar: RegisterScreen, HomeScreen vs.

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserSelect" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserSelect" component={UserSelectScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
