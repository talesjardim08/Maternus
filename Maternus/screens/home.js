import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import Dashboard from "./Dashboard";
import Profile from "./Profile";

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

  const handleUpdateProfile = (formData, avatar) => {
    setSuccessModalOpen(true);
  };

  const handleExit = () => {
    setExitModalOpen(false);
    alert("Saindo do aplicativo! Até breve, mamãe!");
  };

  const sharedProps = {
    currentUser,
    appointments,
    sideMenuOpen,
    setSideMenuOpen,
    exitModalOpen,
    setExitModalOpen,
    successModalOpen,
    setSuccessModalOpen,
    handleUpdateProfile,
    handleExit,
    navigation,
  };

   return (
    <Dashboard
      currentUser={currentUser}
      appointments={appointments}
      sideMenuOpen={sideMenuOpen}
      setSideMenuOpen={setSideMenuOpen}
      exitModalOpen={exitModalOpen}
      setExitModalOpen={setExitModalOpen}
      successModalOpen={successModalOpen}
      setSuccessModalOpen={setSuccessModalOpen}
      handleUpdateProfile={handleUpdateProfile}
      handleExit={handleExit}
      navigation={navigation}
    />
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
