import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CAPITULOS } from "../data/capitulos";
import * as ImagePicker from "expo-image-picker";
import { saveEntry, getLastEntry } from "../storege/diario-store";

export default function CapituloDetalhe({ route, navigation }) {
  const { capituloId } = route.params;
  const capitulo = useMemo(() => CAPITULOS.find((c) => c.id === capituloId), [capituloId]);

  const [imagemUri, setImagemUri] = useState(capitulo.imagemPadrao);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    (async () => {
      const last = await getLastEntry(capituloId);
      if (last?.imagemUri) setImagemUri(last.imagemUri);
    })();
  }, [capituloId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    await saveEntry(capituloId, {
      imagemUri,
      texto,
      dataISO: new Date().toISOString(),
    });
    Alert.alert("Salvo!", "Seu registro foi adicionado.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#8B5CF6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Capítulos da história</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Card topo com imagem + título */}
        <View style={styles.card}>
          <Image source={{ uri: imagemUri }} style={styles.topImage} />
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>{capitulo.titulo}</Text>
            <Ionicons name="add-circle-outline" size={22} color="#6D28D9" />
          </View>
        </View>

        {/* Área de upload */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Anexe fotos e vídeos desse momento, mamãe!</Text>
          <TouchableOpacity style={styles.clip} onPress={pickImage}>
            <Ionicons name="attach" size={36} color="white" />
          </TouchableOpacity>
        </View>

        {/* Texto */}
        <View style={styles.textBox}>
          <Text style={styles.textLabel}>Escreva com as suas palavras como foi</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Data:&#10;Como foi:"
            placeholderTextColor="#9CA3AF"
            multiline
            value={texto}
            onChangeText={setTexto}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom nav visual */}
      <View style={styles.bottomNav}>
        <Ionicons name="people" size={24} color="#F0ABFC" />
        <Ionicons name="home" size={24} color="#F0ABFC" />
        <Ionicons name="heart" size={24} color="#F0ABFC" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#8B5CF6", fontWeight: "600", fontSize: 16 },

  card: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  topImage: { width: "100%", height: 160 },
  cardRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: { color: "#6B21A8", fontSize: 14, fontWeight: "500" },

  uploadBox: {
    marginHorizontal: 16,
    backgroundColor: "#F3E8FF",
    borderRadius: 12,
    padding: 16,
  },
  uploadTitle: { color: "#7C3AED", fontWeight: "600" },
  clip: {
    marginTop: 12,
    backgroundColor: "#7C3AED",
    height: 90,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  textBox: { margin: 16 },
  textLabel: { color: "#7C3AED", marginBottom: 8, fontWeight: "600" },
  textarea: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    minHeight: 110,
    padding: 12,
    color: "#374151",
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: "#E9D5FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveText: { color: "#8B5CF6", fontWeight: "600", fontSize: 16 },

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
