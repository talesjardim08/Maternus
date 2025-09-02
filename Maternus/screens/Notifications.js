// Notifications.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Notifications({ notifications = [], removeNotification, handleScreenChange }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleScreenChange("dashboard")} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#8B5CF6" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      {/* LISTA DE NOTIFICAÇÕES */}
      <View style={styles.notificationsContainer}>
        {notifications.length === 0 ? (
          <Text style={styles.noNotifications}>Nenhuma notificação disponível.</Text>
        ) : (
          notifications.map((notif) => (
            <View key={notif.id} style={styles.notificationCard}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notif.title}</Text>
                <TouchableOpacity onPress={() => removeNotification(notif.id)}>
                  <AntDesign name="close" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.notificationMessage}>{notif.message}</Text>
              <Text style={styles.notificationTime}>{notif.time}</Text>
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
  notificationsContainer: { marginBottom: 24 },
  notificationCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  notificationMessage: { fontSize: 14, color: "#4B5563", marginBottom: 4 },
  notificationTime: { fontSize: 12, color: "#9CA3AF" },
  noNotifications: { fontSize: 16, color: "#6B7280", textAlign: "center", marginTop: 32 },
});
