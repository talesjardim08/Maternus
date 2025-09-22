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
  screen: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { paddingTop: 48, paddingBottom: 32, paddingHorizontal: 24 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  headerButton: { padding: 8 },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { fontSize: 24, fontWeight: "500", color: "white" },
  userRole: { fontSize: 18, color: "rgba(255,255,255,0.9)" },
  content: { flex: 1 },
  modulesContainer: { paddingHorizontal: 24, marginTop: 24, marginBottom: 32 },
  moduleGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  moduleWrapper: { width: "48%", marginBottom: 16 },
  moduleCard: {
    borderRadius: 20,
    paddingVertical: 32,
    alignItems: "center",
    minHeight: 120,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  moduleIcon: { marginBottom: 12 },
  moduleText: { color: "white", fontSize: 18, fontWeight: "600", textAlign: "center" },
  appointmentsSection: { paddingHorizontal: 24, marginBottom: 24 },
  appointmentsButton: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    marginBottom: 16,
  },
  appointmentsButtonText: { color: "white", fontSize: 18, fontWeight: "500" },
  appointmentsDescription: { fontSize: 14, color: "#6B7280", marginBottom: 16 },
  linkText: { color: "#8B5CF6", fontWeight: "500" },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
  },
  appointmentDate: {
    backgroundColor: "#8B5CF6",
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  appointmentDateText: { color: "white", fontWeight: "700" },
  appointmentDetail: { fontSize: 15, color: "#374151", marginBottom: 4 },
  appointmentLabel: { fontWeight: "700" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  sideMenu: { width: 280, backgroundColor: "white", height: "100%" },
  sideMenuHeader: { padding: 24, flexDirection: "row", alignItems: "center" },
  sideMenuAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sideMenuName: { fontSize: 18, fontWeight: "600", color: "white" },
  sideMenuRole: { fontSize: 14, color: "rgba(255,255,255,0.9)" },
  sideMenuContent: { padding: 16 },
  menuItem: { paddingVertical: 12 },
  menuItemText: { fontSize: 16, color: "#374151" },
  exitModal: { backgroundColor: "white", borderRadius: 16, padding: 24, marginHorizontal: 32 },
  exitModalTitle: { fontSize: 18, fontWeight: "500", textAlign: "center", marginBottom: 16 },
  exitModalButtons: { flexDirection: "row", gap: 12 },
  confirmButton: {
    flex: 1,
    backgroundColor: "#8B5CF6",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: { color: "white", fontWeight: "500" },
  cancelButton: {
    flex: 1,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: { color: "#374151", fontWeight: "500" },
});
