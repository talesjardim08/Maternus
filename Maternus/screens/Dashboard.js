import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function Dashboard({
  currentUser,
  appointments = [],
  navigation,
  sideMenuOpen,
  setSideMenuOpen,
  exitModalOpen,
  setExitModalOpen,
  handleExit,
}) {
  const modules = [
    { label: "Saude", icon: <MaterialIcons name="local-hospital" size={36} color="white" />, screen: "Saude" },
    { label: "Diario", icon: <FontAwesome5 name="book" size={36} color="white" />, screen: "Diario" },
    { label: "Agenda", icon: <MaterialIcons name="calendar-today" size={36} color="white" />, screen: "Agenda" },
    { label: "Campanhas", icon: <MaterialIcons name="campaign" size={36} color="white" />, screen: "Campanhas-App" },
  ];

  const handleModulePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <LinearGradient
        colors={["#8B5CF6", "#A855F7", "#C084FC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.headerButton} onPress={() => setSideMenuOpen(true)}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="white" />
          </View>
          <View>
            <Text style={styles.userName}>{currentUser?.name || "Usuário"}</Text>
            <Text style={styles.userRole}>{currentUser?.role || "Cargo"}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* CONTEÚDO */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.modulesContainer}>
          <View style={styles.moduleGrid}>
            {modules.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleModulePress(item.screen)}
                style={styles.moduleWrapper}
              >
                <LinearGradient
                  colors={["#8B5CF6", "#A855F7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.moduleCard}
                >
                  <View style={styles.moduleIcon}>{item.icon}</View>
                  <Text style={styles.moduleText}>{item.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ATENDIMENTOS */}
        <View style={styles.appointmentsSection}>
          <TouchableOpacity
            style={styles.appointmentsButton}
            onPress={() => navigation.navigate("Agenda")}
          >
            <Text style={styles.appointmentsButtonText}>Próximos atendimentos</Text>
          </TouchableOpacity>
          <Text style={styles.appointmentsDescription}>
            Estes são os seus atendimentos com a data mais próxima. Para visualizar todos entre na sua{" "}
            <Text style={styles.linkText}>agenda</Text>.
          </Text>
          {appointments.slice(0, 2).map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentDate}>
                <Text style={styles.appointmentDateText}>{appointment.date}</Text>
              </View>
              <Text style={styles.appointmentDetail}>
                <Text style={styles.appointmentLabel}>Atendimento:</Text> {appointment.type}
              </Text>
              <Text style={styles.appointmentDetail}>
                <Text style={styles.appointmentLabel}>Especialidade:</Text> {appointment.specialty}
              </Text>
              <Text style={styles.appointmentDetail}>
                <Text style={styles.appointmentLabel}>Horário:</Text> {appointment.time}
              </Text>
              <Text style={styles.appointmentDetail}>
                <Text style={styles.appointmentLabel}>Local:</Text> {appointment.location}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* SIDE MENU */}
      <Modal visible={sideMenuOpen} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSideMenuOpen(false)}
        >
          <View style={styles.sideMenu}>
            <LinearGradient colors={["#8B5CF6", "#A855F7", "#C084FC"]} style={styles.sideMenuHeader}>
              <View style={styles.sideMenuAvatar}>
                <Ionicons name="person" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.sideMenuName}>{currentUser?.name || "Usuário"}</Text>
                <Text style={styles.sideMenuRole}>{currentUser?.role || "Cargo"}</Text>
              </View>
            </LinearGradient>
            <View style={styles.sideMenuContent}>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Main")}>
                <Text style={styles.menuItemText}>Início</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Profile", { currentUser })}>
                <Text style={styles.menuItemText}>Editar meus dados pessoais</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => setExitModalOpen(true)}>
                <Text style={styles.menuItemText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* EXIT MODAL */}
      <Modal visible={exitModalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.exitModal}>
            <Text style={styles.exitModalTitle}>
              Realmente deseja sair da sua conta no aplicativo? Você terá que fazer log-in novamente.
            </Text>
            <View style={styles.exitModalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleExit}>
                <Text style={styles.confirmButtonText}>Confirmar e sair</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setExitModalOpen(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },

  // HEADER
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  headerTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 28 },
  headerButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { fontSize: 26, fontWeight: "700", color: "white" },
  userRole: { fontSize: 16, color: "rgba(255,255,255,0.85)" },

  // MÓDULOS
  modulesContainer: { paddingHorizontal: 24, marginTop: 28, marginBottom: 36 },
  moduleGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  moduleWrapper: { width: "48%", marginBottom: 20 },
  moduleCard: {
    borderRadius: 24,
    paddingVertical: 36,
    alignItems: "center",
    minHeight: 130,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  moduleIcon: { marginBottom: 14 },
  moduleText: { color: "white", fontSize: 17, fontWeight: "600", textAlign: "center" },

  // ATENDIMENTOS
  appointmentsSection: { paddingHorizontal: 24, marginBottom: 28 },
  appointmentsButton: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  appointmentsButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
  appointmentsDescription: { fontSize: 14, color: "#6B7280", marginBottom: 18, lineHeight: 20 },
  linkText: { color: "#7C3AED", fontWeight: "600" },

  appointmentCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
  },
  appointmentDate: {
    backgroundColor: "#7C3AED",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  appointmentDateText: { color: "white", fontWeight: "700", fontSize: 13 },
  appointmentDetail: { fontSize: 15, color: "#374151", marginBottom: 5 },
  appointmentLabel: { fontWeight: "700", color: "#111827" },

  // MENU LATERAL
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  sideMenu: {
    width: 300,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 12,
    elevation: 10,
  },
  sideMenuHeader: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
  },
  sideMenuAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  sideMenuName: { fontSize: 18, fontWeight: "700", color: "#4B5563" },
  sideMenuRole: { fontSize: 14, color: "#6B7280" },
  sideMenuContent: { padding: 16 },
  menuItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  menuItemText: { fontSize: 16, color: "#374151", fontWeight: "500" },

  // MODAL DE SAÍDA
  exitModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 26,
    marginHorizontal: 32,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 8,
  },
  exitModalTitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20, lineHeight: 22 },
  exitModalButtons: { flexDirection: "row", gap: 14 },
  confirmButton: {
    flex: 1,
    backgroundColor: "#8B5CF6",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmButtonText: { color: "white", fontWeight: "600", fontSize: 15 },
  cancelButton: {
    flex: 1,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelButtonText: { color: "#374151", fontWeight: "600", fontSize: 15 },
});