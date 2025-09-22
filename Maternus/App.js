import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./screens/routes";
import { UIProvider } from "./UIContext";

export default function App() {
  return (
    <UIProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </UIProvider>
  );
}
