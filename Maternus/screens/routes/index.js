import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import LoginScreen from '../login';
import CadScreen from '../cadastro';
import HomeScreen from '../home';
import Saude from '../saude';
import Campanha from '../campanha';
import DiarioNavigator from '../diario/ diario-navigator.js';
import AgendaNavigator from '../agenda/agenda-navigator.js';
import CampanhasApp from '../campanhas/campanhasApp.js';
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={CadScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Diario" component={DiarioNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Agenda" component={AgendaNavigator} options={{headerShown: false}} />
      <Stack.Screen name="Saude" component={Saude} options={{ headerShown: false }} />
      <Stack.Screen name="Campanhaas-placeholder" component={Campanha} />
      <Stack.Screen name="Campanhas-App" component={CampanhasApp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
