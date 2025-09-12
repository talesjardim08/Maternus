import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

// Telas internas
import Dashboard from "./Dashboard";
import Appointments from "./Appointments"; // consultas
import Agenda from "./agenda"; // agenda geral
import Profile from "./Profile";
import Notifications from "./Notifications";
import Campanhas from "./campanha";
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

  const handleUpdateProfile = (formData, avatar) => {
    setSuccessModalOpen(true);
  };

  const handleExit = () => {
    setExitModalOpen(false);
    Alert.alert("Saindo do aplicativo", "Até breve, mamãe!");
  };

  const removeNotification = (id) => {
    // Atualize o estado se precisar
  };

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
      {/* Telas internas */}
      {currentScreen === "dashboard" && <Dashboard {...sharedProps} />}
      {currentScreen === "appointments" && <Appointments {...sharedProps} />}
      {currentScreen === "agenda" && <Agenda {...sharedProps} />}
      {currentScreen === "profile" && <Profile {...sharedProps} />}
      {currentScreen === "notifications" && <Notifications {...sharedProps} />}
      {/* REMOVIDO: {currentScreen === "diario" && <DiarioNavigator />} */}
      {currentScreen === "saude" && (<Saude navigation={navigation} currentUser={currentUser} />)}

      {/* Card da usuária */}
      {currentScreen === "dashboard" && (
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => handleScreenChange("saude")}
        >
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleScreenChange("notifications")}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill={currentScreen === "notifications" ? "#3B82F6" : "#9CA3AF"}
                d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleScreenChange("dashboard")}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill={currentScreen === "dashboard" ? "#3B82F6" : "#9CA3AF"}
                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleScreenChange("profile")}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill={currentScreen === "profile" ? "#3B82F6" : "#9CA3AF"}
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
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
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 12,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButton: { padding: 8 },
});
