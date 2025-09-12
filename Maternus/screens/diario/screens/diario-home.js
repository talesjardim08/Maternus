// DiarioHome.js
import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CAPITULOS } from "../data/capitulos";
import FormularioDiarioModal from "../components/formulario-diario-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDailyForm } from "../storege/diario-store";

export default function DiarioHome({ navigation }) {
  const hoje = useMemo(() => new Date(), []);
  const dateISO = useMemo(() => hoje.toISOString().slice(0, 10), [hoje]);

  const [textoDia, setTextoDia] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [expand, setExpand] = useState(false);
  const [ultimoEnvio, setUltimoEnvio] = useState(null);
  const [capitulos, setCapitulos] = useState([]);

  const placeholder = require("../components/placeholder.png");

  // Carrega últimos envios e capítulos
  const loadCapitulos = async () => {
    const loaded = await Promise.all(
      CAPITULOS.map(async (c) => {
        try {
          const raw = await AsyncStorage.getItem(`capitulo:${c.id}`);
          if (raw) {
            const data = JSON.parse(raw);
            return {
              ...c,
              titulo: data.titulo || c.titulo,
              imagemAtual: data.imagemUri ? { uri: data.imagemUri } : placeholder,
            };
          }
          return { ...c, imagemAtual: placeholder };
        } catch {
          return { ...c, imagemAtual: placeholder };
        }
      })
    );
    setCapitulos(loaded);
  };

  useEffect(() => {
    (async () => {
      const prev = await getDailyForm(dateISO);
      if (prev) setUltimoEnvio(prev);
      await loadCapitulos();
    })();
  }, [dateISO]);

  const dataFormatada = useMemo(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(hoje);
    const [dia, restante] = fmt.split(" de ");
    return { dia, restante: `de ${restante}` };
  }, [hoje]);

  // Atualiza galeria quando volta do CapituloDetalhe
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCapitulos();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        {/* HEADER */}
        <LinearGradient
          colors={["#8B5CF6", "#A855F7", "#C084FC"]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => navigation.goBack()} // ✅ corrigido para voltar para a Home sem recriar
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.headerInfo}>
              <View style={styles.headerIcon}>
                <Ionicons name="book" size={16} color="#fff" />
              </View>
              <Text style={styles.headerTitle}>Diário</Text>
            </View>

            <View style={{ width: 24 }} />
          </View>

          <Text style={styles.headerSubtitle}>
            Preencha sua galeria de registros desse ciclo e fale um pouco sobre
            como você se sente no dia a dia:
          </Text>
        </LinearGradient>

        {/* CARD DA DATA + FORMULÁRIO RESUMO */}
        <View style={styles.dateCard}>
          <Text style={styles.dateNumber}>{dataFormatada.dia}</Text>
          <Text style={styles.dateRestante}>{dataFormatada.restante}</Text>

          <TextInput
            style={styles.textarea}
            placeholder="Conte um pouquinho sobre o que aconteceu hoje..."
            placeholderTextColor="#9CA3AF"
            multiline
            value={textoDia}
            onChangeText={setTextoDia}
          />

          <TouchableOpacity
            style={styles.formBtn}
            onPress={() => setFormVisible(true)}
          >
            <Ionicons name="document-text" size={18} color="#fff" />
            <Text style={styles.formBtnText}>Abrir Formulário</Text>
          </TouchableOpacity>

          {ultimoEnvio && (
            <View style={styles.lastRow}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.lastText}>
                Último envio: Exercício {ultimoEnvio.exercicio?.toLowerCase?.()},
                Atividade {ultimoEnvio.atividade?.toLowerCase?.()}, Trabalho{" "}
                {ultimoEnvio.trabalho?.toLowerCase?.()}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => navigation.navigate("respostas-historico")}
          >
            <Ionicons name="time" size={18} color="#8B5CF6" />
            <Text style={styles.historyText}>Ver respostas anteriores</Text>
          </TouchableOpacity>
        </View>

        {/* CAPÍTULOS */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity
            style={styles.sectionLeft}
            onPress={() => setExpand((v) => !v)}
          >
            <Ionicons name="bookmark" size={16} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Capítulos da história</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setExpand((v) => !v)}>
            <Ionicons
              name={expand ? "chevron-up" : "chevron-down"}
              size={20}
              color="#8B5CF6"
            />
          </TouchableOpacity>
        </View>

        {expand && (
          <View style={styles.grid}>
            {capitulos.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("capitulo-detalhe", { capituloId: c.id, novo: false })
                }
              >
                <Image source={c.imagemAtual} style={styles.cardImage} />
                <View style={styles.cardBottom}>
                  <Text style={styles.cardTitle}>{c.titulo}</Text>
                  <Ionicons name="add-circle-outline" size={22} color="#6D28D9" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.addPageCta}
          onPress={() =>
            navigation.navigate("capitulo-detalhe", { novo: true })
          }
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addPageGradient}
          >
            <Text style={styles.addPageText}>Adicione uma página à sua história</Text>
            <Ionicons name="add-circle" size={26} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      <FormularioDiarioModal
        visible={formVisible}
        dateISO={dateISO}
        onClose={() => setFormVisible(false)}
        onSaved={(p) => setUltimoEnvio(p)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 40 : 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 20 },
  headerSubtitle: { color: "white", marginTop: 10, lineHeight: 20, fontSize: 14, opacity: 0.95 },

  dateCard: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  dateNumber: { fontSize: 40, color: "#8B5CF6", fontWeight: "700" },
  dateRestante: { color: "#6B7280", marginBottom: 16 },
  textarea: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
    minHeight: 110,
    color: "#374151",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  formBtn: {
    backgroundColor: "#8B5CF6",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  formBtnText: { color: "white", fontWeight: "600" },

  lastRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14, flexWrap: "wrap" },
  lastText: { color: "#374151", fontSize: 12 },

  historyBtn: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8B5CF6",
    backgroundColor: "#F3E8FF",
  },
  historyText: { color: "#6D28D9", fontWeight: "600" },

  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { color: "#8B5CF6", fontWeight: "700" },

  grid: { paddingHorizontal: 24, gap: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 120 },
  cardBottom: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  cardTitle: { color: "#6B21A8", fontSize: 14, fontWeight: "500" },

  addPageCta: {
    marginTop: 12,
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  addPageGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addPageText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 16,
  },
});
