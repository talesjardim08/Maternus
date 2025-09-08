import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { saveDailyForm } from "../storege/diario-store";

const EXERCICIO_OPTIONS = ["Caminhada", "Alongamento", "Natação", "Musculação leve", "Outro(a)"];
const ATIVIDADE_OPTIONS = ["Casa", "Estudo", "Lazer", "Consulta", "Outro(a)"];
const TRABALHO_OPTIONS = ["Remoto", "Presencial", "Licença", "Outro(a)"];

export default function FormularioDiarioModal({ visible, onClose, dateISO, onSaved }) {
  const [exercicio, setExercicio] = useState("");
  const [exercicioOutro, setExercicioOutro] = useState("");
  const [atividade, setAtividade] = useState("");
  const [atividadeOutro, setAtividadeOutro] = useState("");
  const [trabalho, setTrabalho] = useState("");
  const [trabalhoOutro, setTrabalhoOutro] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const resolveValor = (valor, outro) => (valor === "Outro(a)" ? outro?.trim() || "Outro" : valor);

  const handleSave = async () => {
    const payload = {
      exercicio: resolveValor(exercicio, exercicioOutro),
      atividade: resolveValor(atividade, atividadeOutro),
      trabalho: resolveValor(trabalho, trabalhoOutro),
      observacoes: observacoes?.trim() || "",
    };
    await saveDailyForm(dateISO, payload);
    onSaved?.(payload);
    onClose?.();
  };

  return (
    <Modal animationType="slide" visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {/* Header */}
          <LinearGradient colors={["#8B5CF6", "#A855F7", "#C084FC"]} style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Formulário do dia</Text>
              <TouchableOpacity onPress={onClose} hitSlop={8}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerSub}>Responda e, se precisar, use “Outro(a)” para escrever.</Text>
          </LinearGradient>

          {/* Conteúdo */}
          <View style={styles.content}>
            {/* Exercício */}
            <Text style={styles.label}>Exercício</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={exercicio} onValueChange={setExercicio}>
                <Picker.Item label="Selecione..." value="" />
                {EXERCICIO_OPTIONS.map((opt) => (
                  <Picker.Item key={opt} label={opt} value={opt} />
                ))}
              </Picker>
            </View>
            {exercicio === "Outro(a)" && (
              <TextInput
                style={styles.input}
                placeholder="Descreva o exercício"
                value={exercicioOutro}
                onChangeText={setExercicioOutro}
              />
            )}

            {/* Atividade */}
            <Text style={styles.label}>Atividade</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={atividade} onValueChange={setAtividade}>
                <Picker.Item label="Selecione..." value="" />
                {ATIVIDADE_OPTIONS.map((opt) => (
                  <Picker.Item key={opt} label={opt} value={opt} />
                ))}
              </Picker>
            </View>
            {atividade === "Outro(a)" && (
              <TextInput
                style={styles.input}
                placeholder="Descreva a atividade"
                value={atividadeOutro}
                onChangeText={setAtividadeOutro}
              />
            )}

            {/* Trabalho */}
            <Text style={styles.label}>Trabalho</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={trabalho} onValueChange={setTrabalho}>
                <Picker.Item label="Selecione..." value="" />
                {TRABALHO_OPTIONS.map((opt) => (
                  <Picker.Item key={opt} label={opt} value={opt} />
                ))}
              </Picker>
            </View>
            {trabalho === "Outro(a)" && (
              <TextInput
                style={styles.input}
                placeholder="Descreva sua situação de trabalho"
                value={trabalhoOutro}
                onChangeText={setTrabalhoOutro}
              />
            )}

            {/* Observações gerais */}
            <Text style={styles.label}>Observações (opcional)</Text>
            <TextInput
              style={[styles.input, { minHeight: 80, textAlignVertical: "top" }]}
              multiline
              placeholder="Escreva qualquer detalhe importante do dia"
              value={observacoes}
              onChangeText={setObservacoes}
            />

            {/* Botão Salvar */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name="save" size={18} color="#fff" />
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden", maxHeight: "92%" },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? 16 : 12, paddingBottom: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "#fff", opacity: 0.95, marginTop: 8 },
  content: { padding: 16 },
  label: { color: "#374151", marginTop: 12, marginBottom: 6, fontWeight: "600" },
  pickerWrap: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, backgroundColor: "#F9FAFB" },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, backgroundColor: "#FFFFFF", paddingHorizontal: 12, paddingVertical: 10, marginTop: 8 },
  saveBtn: { marginTop: 16, backgroundColor: "#8B5CF6", borderRadius: 10, paddingVertical: 12, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 },
  saveText: { color: "#fff", fontWeight: "700" },
});
