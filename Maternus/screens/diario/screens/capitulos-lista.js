import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CAPITULOS } from "../data/capitulos";
import { getLastEntry } from "../storege/diario-store";
import { useFocusEffect } from "@react-navigation/native";
import { Image as RNImage } from "react-native";

const placeholderUri = RNImage.resolveAssetSource(
  require("../components/placeholder.png")
).uri;

export default function CapitulosLista({ navigation }) {
  const [items, setItems] = useState(
    CAPITULOS.map((c) => ({ ...c, imagemAtual: { uri: placeholderUri } }))
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const updated = await Promise.all(
          CAPITULOS.map(async (c) => {
            const last = await getLastEntry(c.id);
            let imagemAtual;

            if (last?.imagemUri) {
              imagemAtual = { uri: last.imagemUri };
            } else {
              imagemAtual = { uri: placeholderUri };
            }

            return { ...c, imagemAtual };
          })
        );
        setItems(updated);
      })();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("capitulo-detalhe", { capituloId: item.id })
      }
    >
      <Image
        source={item.imagemAtual}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardRow}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Ionicons
          name="checkmark-circle"
          size={22}
          color={
            item.imagemAtual.uri === placeholderUri ? "#6D28D9" : "#10B981"
          }
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.header, { paddingTop: Platform.OS === "android" ? 48 : 24 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#8B5CF6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capítulos da história</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#8B5CF6", fontWeight: "600", fontSize: 16 },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 140 },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cardTitle: { color: "#6B21A8", fontSize: 14, fontWeight: "500" },
});
