// index.js – Navegação principal (Tab-bar em todas as telas exceto Login/Cadastro)
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../login';
import Cadastro from '../cadastro';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Telas sem tab-bar */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />

      {/* Todo o resto dentro do TabNavigator */}
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}
