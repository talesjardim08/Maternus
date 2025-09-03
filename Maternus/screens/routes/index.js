import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../login';
import CadScreen from '../cadastro';
import HomeScreen from '../home';
import Saude from '../saude';
import Agenda from '../agenda';
import Campanha from '../campanha';
import DiarioNavigator from '../diario/diario-navigator'; // corrigido

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={CadScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Diario" component={DiarioNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Saude" component={Saude} options={{ headerShown: false }} />
      <Stack.Screen name="Agenda" component={Agenda} />
      <Stack.Screen name="Campanhas" component={Campanha} />
    </Stack.Navigator>
  );
}
