import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { CAPITULOS } from "../data/capitulos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image as RNImage } from "react-native";

const placeholderUri = RNImage.resolveAssetSource(
  require("../components/placeholder.png")
).uri;

export default function CapituloDetalhe({ route, navigation }) {
  const { capituloId, novo } = route.params || {};
  const capitulo = useMemo(
    () => CAPITULOS.find((c) => c.id === capituloId),
    [capituloId]
  );

  const [titulo, setTitulo] = useState(capitulo?.titulo || "");
  const [texto, setTexto] = useState("");
  const [imagemUri, setImagemUri] = useState({ uri: placeholderUri });

  // Carrega dados salvos
  useEffect(() => {
    if (!capituloId) return;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(`capitulo:${capituloId}`);
        if (raw) {
          const data = JSON.parse(raw);
          if (data.texto) setTexto(data.texto);
          if (data.imagemUri) setImagemUri({ uri: data.imagemUri });
        }
      } catch (e) {
        console.warn("Erro ao carregar capítulo", e);
      }
    })();
  }, [capituloId]);

  // Permite escolher imagem
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Permita acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagemUri({ uri: result.assets[0].uri });
    }
  };

  // Salvar capítulo
  const handleSave = async () => {
    if (!texto.trim() && imagemUri.uri === placeholderUri && !titulo.trim()) {
      Alert.alert(
        "Ops!",
        "É necessário adicionar texto, título ou uma imagem antes de salvar."
      );
      return;
    }

    const payload = {
      titulo: titulo || capitulo?.titulo || "Sem título",
      texto,
      imagemUri: imagemUri.uri,
      criadoEm: new Date().toISOString(),
    };

    const id = capituloId || `novo-${Date.now()}`;

    try {
      await AsyncStorage.setItem(`capitulo:${id}`, JSON.stringify(payload));
      Alert.alert("Salvo!", "Seu capítulo foi salvo com sucesso.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar o capítulo.");
      console.warn(e);
    }
  };

  // Excluir capítulo
  const handleDelete = async () => {
    if (!capituloId || capituloId.startsWith("novo-")) {
      Alert.alert("Atenção", "Não é possível deletar capítulos padrão.");
      return;
    }

    Alert.alert("Excluir capítulo", "Deseja realmente excluir este capítulo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(`capitulo:${capituloId}`);
            navigation.goBack();
          } catch (e) {
            Alert.alert("Erro", "Não foi possível excluir o capítulo.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
            <Ionicons name="chevron-back" size={22} color="#8B5CF6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {novo ? "Novo capítulo" : `Capítulo: ${capitulo?.titulo}`}
          </Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Imagem */}
        <View style={styles.card}>
          <Image source={imagemUri} style={styles.topImage} resizeMode="cover" />
        </View>

        {/* Upload */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Adicionar/Alterar foto do capítulo</Text>
          <TouchableOpacity style={styles.clip} onPress={pickImage}>
            <Ionicons name="attach" size={36} color="white" />
          </TouchableOpacity>
        </View>

        {/* Título */}
        {novo && (
          <View style={styles.textBox}>
            <Text style={styles.textLabel}>Título do capítulo</Text>
            <TextInput
              style={styles.textarea}
              placeholder="Digite o título do capítulo"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>
        )}

        {/* Texto */}
        <View style={styles.textBox}>
          <Text style={styles.textLabel}>Descrição do capítulo</Text>
          <TextInput
            style={[styles.textarea, { minHeight: 110 }]}
            placeholder="Descreva este capítulo..."
            multiline
            value={texto}
            onChangeText={setTexto}
          />
        </View>

        {/* Botões */}
        <View style={{ margin: 16, flexDirection: "row", gap: 12 }}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>

          {!novo && (
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: "#EF4444" }]}
              onPress={handleDelete}
            >
              <Text style={styles.saveText}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 48 : 24,
    paddingBottom: 12,
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

  uploadBox: {
    marginHorizontal: 16,
    backgroundColor: "#F3E8FF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  uploadTitle: { color: "#7C3AED", fontWeight: "600" },
  clip: {
    marginTop: 12,
    backgroundColor: "#7C3AED",
    height: 90,
    width: 90,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  textBox: { marginHorizontal: 16, marginTop: 16 },
  textLabel: { color: "#7C3AED", marginBottom: 8, fontWeight: "600" },
  textarea: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    color: "#374151",
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#8B5CF6",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "600" },
});
