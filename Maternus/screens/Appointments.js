// Appointments.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Appointments({ appointments = [], handleScreenChange }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleScreenChange("dashboard")} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#8B5CF6" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Próximos Atendimentos</Text>
      </View>

      {/* LISTA DE ATENDIMENTOS */}
      <View style={styles.appointmentsContainer}>
        {appointments.length === 0 ? (
          <Text style={styles.noAppointments}>Você não possui atendimentos agendados.</Text>
        ) : (
          appointments.map((appointment) => (
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
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3E8FF", paddingHorizontal: 24, paddingTop: 48 },
  header: { marginBottom: 24 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backText: { color: "#8B5CF6", fontSize: 16, fontWeight: "500", marginLeft: 8 },
  headerTitle: { fontSize: 24, fontWeight: "600", color: "#8B5CF6" },
  appointmentsContainer: { marginBottom: 24 },
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
  noAppointments: { fontSize: 16, color: "#6B7280", textAlign: "center", marginTop: 32 },
});
