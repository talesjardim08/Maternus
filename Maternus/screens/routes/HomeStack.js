// Maternus/navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas do Home
import Home from '../home';
import Diario from '../diario/ diario-navigator';
import Agenda from '../agenda';
import Saude from '../saude';
import Campanhas from '../campanhas/campanhasApp';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // esconde o cabeçalho padrão
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Diario" component={Diario} />
      <Stack.Screen name="agenda-navigator" component={Agenda} />
      <Stack.Screen name="Saude" component={Saude} />
      <Stack.Screen name="Campanhas-App" component={Campanhas} />
    </Stack.Navigator>
  );
}
