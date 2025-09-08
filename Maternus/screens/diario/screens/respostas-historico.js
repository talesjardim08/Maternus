import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { listDailyForms } from "../storege/diario-store";

export default function RespostasHistorico({ navigation }) {
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const all = await listDailyForms();
        setData(all);
      })();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="calendar" size={16} color="#8B5CF6" />
        <Text style={styles.cardDate}>{item.dateISO}</Text>
      </View>
      <Text style={styles.line}><Text style={styles.key}>Exercício:</Text> {item.exercicio || "-"}</Text>
      <Text style={styles.line}><Text style={styles.key}>Atividade:</Text> {item.atividade || "-"}</Text>
      <Text style={styles.line}><Text style={styles.key}>Trabalho:</Text> {item.trabalho || "-"}</Text>
      {item.observacoes ? (
        <Text style={styles.obs}><Text style={styles.key}>Obs.:</Text> {item.observacoes}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <LinearGradient colors={["#8B5CF6", "#A855F7", "#C084FC"]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Histórico de Respostas</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        data={data}
        keyExtractor={(it, idx) => `${it.dateISO}-${idx}`}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="information-circle" size={24} color="#9CA3AF" />
            <Text style={styles.emptyText}>Nenhuma resposta encontrada.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 18 },

  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  cardDate: { color: "#6B21A8", fontWeight: "700" },
  line: { color: "#374151", marginTop: 4 },
  key: { fontWeight: "700", color: "#4B5563" },
  obs: { color: "#374151", marginTop: 8 },
  empty: { alignItems: "center", marginTop: 32, gap: 8 },
  emptyText: { color: "#9CA3AF" },
});
