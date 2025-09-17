import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AgendaScreen from './screens/AgendaScreen';
import CriarEventoScreen from './screens/CriarEventoScreen';
import DetalhesEventoScreen from './screens/DetalhesEventoScreen';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();   

export default function AgendaNavigator () {
  return (
      <Stack.Navigator 
        initialRouteName="Agenda"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="CriarEvento" component={CriarEventoScreen} />
        <Stack.Screen name="DetalhesEvento" component={DetalhesEventoScreen} />
      </Stack.Navigator>
  );
}