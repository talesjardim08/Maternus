// Profile.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { UIContext } from "../UIContext";

export default function Profile({ currentUser, handleUpdateProfile, navigation }) {
  const { successModalOpen, setSuccessModalOpen } = useContext(UIContext);

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    nomeCompleto: currentUser?.name || "Maria",
    email: currentUser?.email || "maria@email.com",
    cpf: currentUser?.cpf || "12345678900",
    senha: "12345678",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (setSuccessModalOpen) setSuccessModalOpen(true);
    if (handleUpdateProfile) handleUpdateProfile(formData, avatar);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.canceled) setAvatar(pickerResult.assets[0].uri);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F3E8FF" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
          justifyContent: "flex-start",
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
              <Path
                d="M19 12H5m7-7l-7 7 7 7"
                stroke="#8B5CF6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.backText}>Editar meus dados pessoais</Text>
          </TouchableOpacity>
        </View>

        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Svg width={48} height={48} fill="none" viewBox="0 0 24 24">
                  <Path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            )}
          </TouchableOpacity>
          <Text style={{ color: "#6B7280", marginTop: 8 }}>Toque para trocar a foto</Text>
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{formData.nomeCompleto}</Text>
          <Text style={styles.profileRole}>Mamãe</Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              value={formData.nomeCompleto}
              onChangeText={(text) => handleInputChange("nomeCompleto", text)}
              style={styles.input}
              placeholder="Digite seu nome completo"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-mail / Telefone</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              style={styles.input}
              placeholder="Digite seu e-mail ou telefone"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput
              value={formData.cpf}
              editable={false}
              style={[styles.input, { backgroundColor: "#E5E7EB" }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={showPassword ? formData.senha : "********"}
                secureTextEntry={!showPassword}
                onChangeText={(text) => handleInputChange("senha", text)}
                style={styles.passwordInput}
                placeholder="Digite sua senha"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Svg width={20} height={20} fill="#8B5CF6" viewBox="0 0 24 24">
                    <Path
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                ) : (
                  <Svg width={20} height={20} fill="#8B5CF6" viewBox="0 0 24 24">
                    <Path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>Alterar meus dados</Text>
          </TouchableOpacity>
        </View>

        {/* MODAL DE SUCESSO */}
        <Modal visible={successModalOpen} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.successModal}>
              <View style={styles.successIconContainer}>
                <Svg width={32} height={32} fill="#10B981" viewBox="0 0 24 24">
                  <Path
                    d="M5 13l4 4L19 7"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.successModalTitle}>
                Seus dados foram atualizados com sucesso, mamãe!
              </Text>
              <TouchableOpacity
                onPress={() => setSuccessModalOpen(false)}
                style={styles.okButton}
              >
                <Text style={{ color: "white", fontWeight: "500" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3E8FF" },
  header: { paddingTop: 48, paddingBottom: 24, paddingHorizontal: 24 },
  headerButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#8B5CF6", fontSize: 16, fontWeight: "500", marginLeft: 8 },
  avatarContainer: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 80, height: 80, backgroundColor: "rgba(139,92,246,0.1)", borderRadius: 40, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#8B5CF6" },
  profileInfo: { alignItems: "center", marginBottom: 32 },
  profileName: { fontSize: 20, fontWeight: "500", color: "#8B5CF6", marginBottom: 4 },
  profileRole: { fontSize: 16, color: "#9CA3AF" },
  formContainer: { paddingHorizontal: 24 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: "500", color: "#8B5CF6", marginBottom: 8 },
  input: { padding: 16, fontSize: 16, color: "#1F2937", borderRadius: 12, backgroundColor: "white", elevation: 2 },
  passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 12, elevation: 2 },
  passwordInput: { flex: 1, padding: 16, fontSize: 16, color: "#1F2937" },
  eyeButton: { padding: 16 },
  updateButton: { backgroundColor: "#8B5CF6", padding: 16, borderRadius: 16, alignItems: "center", marginTop: 20 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 16 },
  successModal: { backgroundColor: "white", borderRadius: 16, padding: 24, alignItems: "center", width: "100%", maxWidth: 400 },
  successIconContainer: { width: 64, height: 64, backgroundColor: "#D1FAE5", borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  successModalTitle: { fontSize: 18, fontWeight: "500", color: "#1F2937", textAlign: "center", marginBottom: 16 },
  okButton: { backgroundColor: "#10B981", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24, marginTop: 8 },
});
