import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from'./screens/login';
import CadScreen from'./screens/cadastro';
import HomeScreen from'./screens/home';
import Saude from './screens/saude';
import agenda from './screens/agenda';
import campanha from './screens/campanha';
import Routes from './screens/routes/index';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}


