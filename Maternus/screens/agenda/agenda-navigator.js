import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AgendaScreen from './screens/AgendaScreen';
import CriarEventoScreen from './screens/CriarEventoScreen';
import DetalhesEventoScreen from './screens/DetalhesEventoScreen';

const Stack = createStackNavigator();   

export default function AgendaNavigator () {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}