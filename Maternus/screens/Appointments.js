import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Appointments({ appointments, handleScreenChange }) {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient
        colors={["#8B5CF6", "#A855F7", "#C084FC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => handleScreenChange("dashboard")}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M15 19l-7-7 7-7"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M15 17h5l-5 5-5-5h5v-13z"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Próximos atendimentos</Text>
      </LinearGradient>

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Estes são os seus atendimentos com a data mais próxima mamãe. Para visualizar todos entre na sua{" "}
          <Text style={styles.linkText}>agenda</Text>.
        </Text>

        <View style={styles.appointmentsList}>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentDate}>
                  <Text style={styles.appointmentDateText}>{appointment.date}</Text>
                </View>
              </View>

              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentDetail}>
                  <Text style={styles.appointmentLabel}>Atendimento: </Text>
                  {appointment.type}
                </Text>
                <Text style={styles.appointmentDetail}>
                  <Text style={styles.appointmentLabel}>Especialidade: </Text>
                  {appointment.specialty}
                </Text>
                <Text style={styles.appointmentDetail}>
                  <Text style={styles.appointmentLabel}>Horário: </Text>
                  {appointment.time}
                </Text>
                <Text style={styles.appointmentDetail}>
                  <Text style={styles.appointmentLabel}>Local: </Text>
                  {appointment.location}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  description: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  linkText: {
    color: "#8B5CF6",
    fontWeight: "500",
  },
  appointmentsList: {
    flexDirection: "column",
    gap: 16, // ⚠️ se não funcionar no Android, usar marginBottom nos itens
  },
  appointmentCard: {
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9D5FF",
    marginBottom: 16,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  appointmentDate: {
    backgroundColor: "#8B5CF6",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  appointmentDateText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  appointmentInfo: {
    flexDirection: "column",
  },
  appointmentDetail: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  appointmentLabel: {
    fontWeight: "600",
  },
});
