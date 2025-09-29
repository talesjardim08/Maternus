import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./screens/routes";
import { UIProvider } from "./UIContext";
import { PostsProvider } from "./screens/diario/screens/comunidade/PostsContext";

export default function App() {
  return (
    <UIProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <PostsProvider> {/* ✅ Envolvendo tudo */}
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </PostsProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </UIProvider>
  );
}
