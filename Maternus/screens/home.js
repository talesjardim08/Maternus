import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Profile from "./Profile";
import Notifications from "./Notifications";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const currentUser = {
    id: "1",
    name: "Maria da Silva",
    role: "Gestante",
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

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Consulta agendada",
      message: "Sua consulta foi agendada para amanhã às 14h",
      time: "2h atrás",
    },
    {
      id: "2",
      title: "Lembrete de medicação",
      message: "Não esqueça de tomar seu ácido fólico",
      time: "4h atrás",
    },
    {
      id: "3",
      title: "Dica de saúde",
      message: "Beba bastante água durante a gravidez",
      time: "1 dia atrás",
    },
  ]);

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
    setSideMenuOpen(false);
  };

  const handleUpdateProfile = () => {
    setSuccessModalOpen(true);
  };

  const handleExit = () => {
    setExitModalOpen(false);
    Alert.alert("Saindo do aplicativo", "Até breve, mamãe!");
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
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
  };

  return (
    <View style={styles.container}>
      {currentScreen === "dashboard" && <Dashboard {...sharedProps} />}
      {currentScreen === "appointments" && <Appointments {...sharedProps} />}
      {currentScreen === "profile" && <Profile {...sharedProps} />}
      {currentScreen === "notifications" && <Notifications {...sharedProps} />}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill="#EC4899"
                d="M12 2C10.1 2 8.5 3.6 8.5 5.5S10.1 9 12 9s3.5-1.6 3.5-3.5S13.9 2 12 2zM21 9v2h-4.5c-1.1 0-2 .9-2 2s.9 2 2 2H21v2h-4.5c-2.2 0-4-1.8-4-4s1.8-4 4-4H21zM3 15h4.5c2.2 0 4 1.8 4 4s-1.8 4-4 4H3v-2h4.5c1.1 0 2-.9 2-2s-.9-2-2-2H3v-2z"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleScreenChange("dashboard")}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill="#3B82F6"
                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill="#EC4899"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                   14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                   6.86-8.55 11.54L12 21.35z"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingBottom: 80,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 16,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 48, 
  },
  navButton: {
    padding: 8,
  },
});
