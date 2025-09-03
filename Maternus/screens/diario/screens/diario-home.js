import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CAPITULOS } from "../data/capitulos";
import FormularioDiarioModal from "../components/formulario-diario-modal";
import { getDailyForm } from "../storege/diario-store";

export default function DiarioHome({ navigation }) {
  const hoje = useMemo(() => new Date(), []);
  const dateISO = useMemo(() => hoje.toISOString().slice(0, 10), [hoje]);

  const [textoDia, setTextoDia] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [expand, setExpand] = useState(false);
  const [ultimoEnvio, setUltimoEnvio] = useState(null);

  useEffect(() => {
    (async () => {
      const prev = await getDailyForm(dateISO);
      if (prev) setUltimoEnvio(prev);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        {/* HEADER */}
        <LinearGradient
          colors={["#E9D5FF", "#F5F3FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#8B5CF6" />
            </TouchableOpacity>
            <View style={styles.headerIcon}>
              <Ionicons name="book" size={16} color="#8B5CF6" />
            </View>
            <Text style={styles.headerTitle}>Diário</Text>
            <View style={{ width: 22 }} />
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
            placeholder="Conte um pouquinho sobre o que aconteceu hoje"
            placeholderTextColor="#9CA3AF"
            multiline
            value={textoDia}
            onChangeText={setTextoDia}
          />

          <TouchableOpacity style={styles.formBtn} onPress={() => setFormVisible(true)}>
            <Text style={styles.formBtnText}>Formulário</Text>
          </TouchableOpacity>

          {ultimoEnvio ? (
            <View style={styles.lastRow}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.lastText}>
                Último envio: Exercício {ultimoEnvio.exercicio.toLowerCase()}, Atividade{" "}
                {ultimoEnvio.atividade.toLowerCase()}, Trabalho {ultimoEnvio.trabalho.toLowerCase()}
              </Text>
            </View>
          ) : null}
        </View>

        {/* TEXTO SEÇÃO */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Crie seu diário gestacional, conte sua trajetória com fotos
          </Text>
        </View>

        {/* CAPÍTULOS */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <Ionicons name="bookmark" size={16} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Capítulos da história</Text>
          </View>
          <TouchableOpacity onPress={() => setExpand((v) => !v)}>
            <Ionicons
              name={expand ? "chevron-up" : "chevron-down"}
              size={20}
              color="#8B5CF6"
            />
          </TouchableOpacity>
        </View>

        {expand ? (
          <View style={styles.grid}>
            {CAPITULOS.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.card}
                onPress={() => navigation.navigate("capitulo-detalhe", { capituloId: c.id })}
              >
                <View style={styles.cardImageWrap}>
                  {/* A imagem real/atual vem do detalhe via AsyncStorage; 
                      o componente detalhe atualizará e, ao voltar, a lista recarrega usando `useFocusEffect` no screen de lista.
                      Aqui no Home vamos só navegar (preview está na tela de lista). */}
                  <View style={styles.cardImagePlaceholder} />
                </View>
                <View style={styles.cardBottom}>
                  <Text style={styles.cardTitle}>{c.titulo}</Text>
                  <Ionicons name="add-circle-outline" size={22} color="#6D28D9" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.addPageCta}
          onPress={() => setExpand(true)}
        >
          <Text style={styles.addPageText}>Adicione uma página à sua história</Text>
          <Ionicons name="add-circle" size={22} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM NAV (visual) */}
      <View style={styles.bottomNav}>
        <Ionicons name="people" size={24} color="#F0ABFC" />
        <Ionicons name="home" size={24} color="#F0ABFC" />
        <Ionicons name="heart" size={24} color="#F0ABFC" />
      </View>

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
  header: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
  headerTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#8B5CF6", fontWeight: "600", fontSize: 18 },
  headerSubtitle: {
    color: "#6B7280",
    marginTop: 12,
    lineHeight: 20,
    fontSize: 14,
  },

  dateCard: {
    marginHorizontal: 24,
    marginTop: -20,
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    padding: 16,
  },
  dateNumber: { fontSize: 40, color: "white", fontWeight: "700" },
  dateRestante: { color: "white", opacity: 0.9, marginBottom: 12 },
  textarea: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    color: "#374151",
    marginBottom: 12,
  },
  formBtn: {
    backgroundColor: "#E9D5FF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  formBtnText: { color: "#8B5CF6", fontWeight: "600" },

  lastRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  lastText: { color: "white", fontSize: 12, opacity: 0.95 },

  banner: {
    marginTop: 16,
    backgroundColor: "#FCE7F3",
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  bannerText: { color: "#8B5CF6", fontSize: 14 },

  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { color: "#8B5CF6", fontWeight: "600" },

  grid: { paddingHorizontal: 24, gap: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 12,
  },
  cardImageWrap: { borderRadius: 8, overflow: "hidden", height: 120, backgroundColor: "#F3F4F6" },
  cardImagePlaceholder: { flex: 1 },
  cardBottom: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: { color: "#6B21A8", fontSize: 14, fontWeight: "500" },

  addPageCta: {
    marginTop: 8,
    marginHorizontal: 0,
    backgroundColor: "#7C3AED",
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addPageText: { color: "white", fontWeight: "600" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
