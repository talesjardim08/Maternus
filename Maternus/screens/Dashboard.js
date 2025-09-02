// Dashboard.js
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Dashboard({
  currentUser,
  appointments,
  handleScreenChange,
  sideMenuOpen,
  setSideMenuOpen,
  exitModalOpen,
  setExitModalOpen,
  handleExit,
}) {
  const modules = [
    { label: "Saúde", icon: <MaterialIcons name="local-hospital" size={36} color="white" /> },
    { label: "Diário", icon: <FontAwesome5 name="book" size={36} color="white" /> },
    { label: "Agenda", icon: <AntDesign name="calendar" size={36} color="white" /> },
    { label: "Campanhas", icon: <MaterialIcons name="campaign" size={36} color="white" /> },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient colors={["#8B5CF6", "#A855F7", "#C084FC"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.headerButton} onPress={() => setSideMenuOpen(true)}>
            <AntDesign name="menuunfold" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => handleScreenChange("notifications")}>
            <AntDesign name="bells" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <AntDesign name="user" size={32} color="white" />
          </View>
          <View>
            <Text style={styles.userName}>{currentUser?.name}</Text>
            <Text style={styles.userRole}>{currentUser?.role}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Conteúdo */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Módulos */}
        <View style={styles.modulesContainer}>
          <View style={styles.moduleGrid}>
            {modules.map((item, index) => (
              <LinearGradient key={index} colors={["#8B5CF6","#A855F7"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.moduleCard}>
                <View style={styles.moduleIcon}>{item.icon}</View>
                <Text style={styles.moduleText}>{item.label}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Próximos atendimentos */}
        <View style={styles.appointmentsSection}>
          <TouchableOpacity style={styles.appointmentsButton} onPress={() => handleScreenChange("appointments")}>
            <Text style={styles.appointmentsButtonText}>Próximos atendimentos</Text>
          </TouchableOpacity>
          <Text style={styles.appointmentsDescription}>
            Estes são os seus atendimentos com a data mais próxima mamãe. Para visualizar todos entre na sua{" "}
            <Text style={styles.linkText}>agenda</Text>.
          </Text>
          {appointments.slice(0,2).map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentDate}><Text style={styles.appointmentDateText}>{appointment.date}</Text></View>
              <Text style={styles.appointmentDetail}><Text style={styles.appointmentLabel}>Atendimento:</Text> {appointment.type}</Text>
              <Text style={styles.appointmentDetail}><Text style={styles.appointmentLabel}>Especialidade:</Text> {appointment.specialty}</Text>
              <Text style={styles.appointmentDetail}><Text style={styles.appointmentLabel}>Horário:</Text> {appointment.time}</Text>
              <Text style={styles.appointmentDetail}><Text style={styles.appointmentLabel}>Local:</Text> {appointment.location}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex:1, backgroundColor:"#F9FAFB" },
  header:{ paddingTop:48, paddingBottom:32, paddingHorizontal:24 },
  headerTop:{ flexDirection:"row", justifyContent:"space-between", marginBottom:32 },
  headerButton:{ padding:8 },
  userInfo:{ flexDirection:"row", alignItems:"center", gap:16 },
  avatar:{ width:64, height:64, borderRadius:32, backgroundColor:"rgba(255,255,255,0.2)", justifyContent:"center", alignItems:"center" },
  userName:{ fontSize:24, fontWeight:"500", color:"white" },
  userRole:{ fontSize:18, color:"rgba(255,255,255,0.9)" },
  content:{ flex:1 },
  modulesContainer:{ paddingHorizontal:24, marginTop:24, marginBottom:32 },
  moduleGrid:{ flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between" },
  moduleCard:{ width:"48%", borderRadius:20, paddingVertical:24, alignItems:"center", marginBottom:16 },
  moduleIcon:{ marginBottom:12 },
  moduleText:{ color:"white", fontSize:18, fontWeight:"600", textAlign:"center" },
  appointmentsSection:{ paddingHorizontal:24, marginBottom:24 },
  appointmentsButton:{ borderRadius:16, padding:16, backgroundColor:"#8B5CF6", alignItems:"center", marginBottom:16 },
  appointmentsButtonText:{ color:"white", fontSize:18, fontWeight:"500" },
  appointmentsDescription:{ fontSize:14, color:"#6B7280", marginBottom:16 },
  linkText:{ color:"#8B5CF6", fontWeight:"500" },
  appointmentCard:{ backgroundColor:"white", borderRadius:20, padding:20, marginBottom:16, shadowColor:"#000", shadowOpacity:0.1, shadowOffset:{width:0,height:3}, shadowRadius:10, elevation:4 },
  appointmentDate:{ backgroundColor:"#8B5CF6", borderRadius:24, paddingVertical:6, paddingHorizontal:12, alignSelf:"flex-start", marginBottom:8 },
  appointmentDateText:{ color:"white", fontWeight:"700" },
  appointmentDetail:{ fontSize:15, color:"#374151", marginBottom:4 },
  appointmentLabel:{ fontWeight:"700" },
});
