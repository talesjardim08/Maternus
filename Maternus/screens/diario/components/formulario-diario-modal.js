import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveDailyForm, getDailyForm } from "../storege/diario-store";

const OPTIONS = {
  exercicio: ["Nenhum", "Caminhada", "Yoga", "Musculação", "Outro"],
  atividade: ["Tranquila", "Moderada", "Intensa"],
  trabalho: ["Não trabalhei", "Home office", "Presencial", "Outro"],
  outro: ["Nada a declarar", "Consulta", "Passeio", "Compras do enxoval"],
};

export default function FormularioDiarioModal({ visible, onClose, dateISO, onSaved }) {
  const [exercicio, setExercicio] = useState("Nenhum");
  const [atividade, setAtividade] = useState("Tranquila");
  const [trabalho, setTrabalho] = useState("Não trabalhei");
  const [outro, setOutro] = useState("Nada a declarar");

  useEffect(() => {
    if (visible && dateISO) {
      (async () => {
        const prev = await getDailyForm(dateISO);
        if (prev) {
          setExercicio(prev.exercicio);
          setAtividade(prev.atividade);
          setTrabalho(prev.trabalho);
          setOutro(prev.outro);
        }
      })();
    }
  }, [visible, dateISO]);

  const cycle = (value, arr, setter) => {
    const idx = arr.indexOf(value);
    const next = arr[(idx + 1) % arr.length];
    setter(next);
  };

  const handleSubmit = async () => {
    const payload = { exercicio, atividade, trabalho, outro };
    await saveDailyForm(dateISO, payload);
    onSaved && onSaved(payload);
    onClose && onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
              <Ionicons name="chevron-back" size={22} color="#8B5CF6" />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>O que você fez durante o dia?</Text>
            <View style={{ width: 22 }} />
          </View>

          <View style={styles.rowWrap}>
            <TouchableOpacity
              style={styles.pill}
              onPress={() => cycle(exercicio, OPTIONS.exercicio, setExercicio)}
            >
              <Text style={styles.pillLabel}>Exercício</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
              <Text style={styles.pillValue}>{exercicio}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pill}
              onPress={() => cycle(atividade, OPTIONS.atividade, setAtividade)}
            >
              <Text style={styles.pillLabel}>Atividade</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
              <Text style={styles.pillValue}>{atividade}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pill}
              onPress={() => cycle(trabalho, OPTIONS.trabalho, setTrabalho)}
            >
              <Text style={styles.pillLabel}>Trabalho</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
              <Text style={styles.pillValue}>{trabalho}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pill}
              onPress={() => cycle(outro, OPTIONS.outro, setOutro)}
            >
              <Text style={styles.pillLabel}>Outro</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
              <Text style={styles.pillValue}>{outro}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 16,
  },
  sheet: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  sheetTitle: { color: "#8B5CF6", fontWeight: "600", fontSize: 16 },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  pill: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: (Platform.OS === "web" ? 140 : 150),
    marginBottom: 10,
  },
  pillLabel: { fontSize: 12, color: "#6B7280", marginBottom: 6 },
  pillValue: { fontSize: 14, color: "#374151", marginTop: 4 },
  submit: {
    marginTop: 16,
    backgroundColor: "#E9D5FF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitText: { color: "#8B5CF6", fontWeight: "600", fontSize: 16 },
});
