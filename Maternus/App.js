import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from'./screens/login';
import CadScreen from'./screens/cadastro';
import HomeScreen from'./screens/home';
import Saude from './screens/saude';
import Diario from './screens/diario';
import agenda from './screens/agenda';
import campanha from './screens/campanha';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Cadastro" component={CadScreen} options={{headerShown:false}} />
        <Stack.Screen name="Saude" component={Saude} />
        <Stack.Screen name="Diario" component={Diario} />
        <Stack.Screen name="Agenda" component={agenda} />
        <Stack.Screen name="Campanhas" component={campanha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


