import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../login";
import CadScreen from "../cadastro";
import Saude from "../saude";
import DiarioNavigator from "../diario/ diario-navigator";
import AgendaNavigator from "../agenda/agenda-navigator";
import CampanhasApp from "../campanhas/campanhasApp";
import TabNavigator from "./TabNavigator";
import Notifications from "../Notifications";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Telas de login e cadastro */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadScreen} />

      {/* App principal com tabs */}
      <Stack.Screen name="Main" component={TabNavigator} />

      {/* Telas que NÃO devem mostrar a tab */}
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Diario" component={DiarioNavigator} />
      <Stack.Screen name="Agenda" component={AgendaNavigator} />
      <Stack.Screen name="Saude" component={Saude} />
      <Stack.Screen name="Campanhas-App" component={CampanhasApp} />
    </Stack.Navigator>
  );
}
