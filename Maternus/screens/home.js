import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Agenda from "./agenda";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Saude from "./saude";

export default function Home({ navigation }) {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
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
    {
      id: "1",
      date: "00/00/0000",
      type: "Consulta",
      specialty: "Obstetriz",
      time: "12:00",
      location: "Hospital Minha Vida, Rua Angélica - Jd. Santana, Nº 50, São Paulo, SP",
    },
    {
      id: "2",
      date: "00/00/0000",
      type: "Consulta",
      specialty: "Ginecologista",
      time: "15:00",
      location: "Hospital Minha Vida, Rua Angélica - Jd. Santana, Nº 50, São Paulo, SP",
    },
  ];

  const notifications = [
    { id: "1", title: "Consulta agendada", message: "Sua consulta foi agendada para amanhã às 14h", time: "2h atrás" },
    { id: "2", title: "Lembrete de medicação", message: "Não esqueça de tomar seu ácido fólico", time: "4h atrás" },
    { id: "3", title: "Dica de saúde", message: "Beba bastante água durante a gravidez", time: "1 dia atrás" },
  ];

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
    setSideMenuOpen(false);
  };

  const handleUpdateProfile = (formData, avatar) => setSuccessModalOpen(true);

  const handleExit = () => {
    setExitModalOpen(false);
    Alert.alert("Saindo do aplicativo", "Até breve, mamãe!");
  };

  const removeNotification = (id) => {};

  const sharedProps = {
    currentUser,
    appointments,
    notifications,
    removeNotification,
    handleScreenChange,
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Renderiza a tela atual */}
        {currentScreen === "dashboard" && <Dashboard {...sharedProps} />}
        {currentScreen === "appointments" && <Appointments {...sharedProps} />}
        {currentScreen === "agenda" && <Agenda {...sharedProps} />}
        {currentScreen === "profile" && <Profile {...sharedProps} />}
        {currentScreen === "notifications" && <Notifications {...sharedProps} />}
        {currentScreen === "saude" && <Saude navigation={navigation} currentUser={currentUser} />}
      </ScrollView>

      {/* Card da usuária */}
      {currentScreen === "dashboard" && (
        <TouchableOpacity style={styles.userCard} onPress={() => handleScreenChange("saude")}>
          <View style={styles.userIconContainer}>
            <Ionicons name="person" size={20} color="white" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Maria da Silva (EU)</Text>
            <Text style={styles.userRole}>Gestante</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      )}
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
