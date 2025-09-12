import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiarioHome from "./screens/diario-home";
import CapitulosLista from "./screens/capitulos-lista";
import CapituloDetalhe from "./screens/capitulo-detalhe";
import RespostasHistorico from "./screens/respostas-historico";

const Stack = createNativeStackNavigator();

export default function DiarioNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="diario-home"
    >
      <Stack.Screen name="diario-home" component={DiarioHome} />
      <Stack.Screen name="respostas-historico" component={RespostasHistorico} />
      <Stack.Screen name="capitulos-lista" component={CapitulosLista} />
      <Stack.Screen name="capitulo-detalhe" component={CapituloDetalhe} />
    </Stack.Navigator>
  );
}
