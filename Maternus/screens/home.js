import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Agenda from "./agenda";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Saude from "./saude";

export default function Home({ navigation }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const currentUser = {
    id: "1",
    name: "Maria da Silva",
    role: "Gestante",
    email: "mariadasilva@gmail.com",
    cpf: "123.456.789-00",
    password: "18765432I",
  };

  const appointments = [
    { id: "1", date: "00/00/0000", type: "Consulta", specialty: "Obstetriz", time: "12:00", location: "Hospital Minha Vida" },
    { id: "2", date: "00/00/0000", type: "Consulta", specialty: "Ginecologista", time: "15:00", location: "Hospital Minha Vida" },
  ];

  const notifications = [
    { id: "1", title: "Consulta agendada", message: "Sua consulta foi agendada para amanhã às 14h", time: "2h atrás" },
    { id: "2", title: "Lembrete de medicação", message: "Não esqueça de tomar seu ácido fólico", time: "4h atrás" },
    { id: "3", title: "Dica de saúde", message: "Beba bastante água durante a gravidez", time: "1 dia atrás" },
  ];

  // Mantemos as funções, mas agora usam navigation
  const handleExit = () => {
    setExitModalOpen(false);
    Alert.alert("Saindo do aplicativo", "Até breve, mamãe!");
  };

  const removeNotification = (id) => {
    console.log("Removendo notificação", id);
  };

  const handleUpdateProfile = (formData, avatar) => setSuccessModalOpen(true);

  const sharedProps = {
    currentUser,
    appointments,
    notifications,
    removeNotification,
    handleUpdateProfile,
    handleExit,
    sideMenuOpen,
    setSideMenuOpen,
    exitModalOpen,
    setExitModalOpen,
    successModalOpen,
    setSuccessModalOpen,
    navigation,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Dashboard {...sharedProps} />
      </ScrollView>

      {/* Card da usuária */}
      <TouchableOpacity
        style={styles.userCard}
        onPress={() => navigation.navigate("Saude", { currentUser })}
      >
        <View style={styles.userIconContainer}>
          <Ionicons name="person-outline" size={20} color="white" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Maria da Silva (EU)</Text>
          <Text style={styles.userRole}>Gestante</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  content: { flex: 1, paddingBottom: 16 },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A855F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userInfo: { flex: 1 },
  userName: { color: "white", fontSize: 16, fontWeight: "600" },
  userRole: { color: "white", fontSize: 14 },
});
