import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Agenda() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Agenda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#F3F4F6" },
  text: { fontSize:24, fontWeight:"600", color:"#C084FC" },
});
