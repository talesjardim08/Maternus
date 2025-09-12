import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const CriarEventoScreen = ({ navigation, route }) => {
  const { selectedDate, onEventCreated } = route.params;
  
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('compromisso');
  const [data, setData] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const tiposEvento = [
    { id: 'compromisso', label: 'Compromisso', icon: 'calendar-outline', color: '#8B5FBF' },
    { id: 'lembrete', label: 'Lembrete', icon: 'notifications-outline', color: '#FFA726' },
    { id: 'meta', label: 'Meta', icon: 'flag-outline', color: '#66BB6A' },
  ];

  const handleSalvar = () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para o evento.');
      return;
    }

    const novoEvento = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      tipo,
      data: data.toISOString().split('T')[0],
      hora: hora.toTimeString().slice(0, 5),
      criadoEm: new Date().toISOString(),
    };

    onEventCreated(novoEvento);
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toTimeString().slice(0, 5);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerIconContainer}>
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.headerTitle}>Criar Evento</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Tipo de Evento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Evento</Text>
          <View style={styles.tipoContainer}>
            {tiposEvento.map((tipoItem) => (
              <TouchableOpacity
                key={tipoItem.id}
                style={[
                  styles.tipoButton,
                  tipo === tipoItem.id && styles.tipoButtonActive,
                  { borderColor: tipoItem.color }
                ]}
                onPress={() => setTipo(tipoItem.id)}
              >
                <Ionicons
                  name={tipoItem.icon}
                  size={20}
                  color={tipo === tipoItem.id ? '#FFFFFF' : tipoItem.color}
                />
                <Text
                  style={[
                    styles.tipoButtonText,
                    tipo === tipoItem.id && styles.tipoButtonTextActive,
                    { color: tipo === tipoItem.id ? '#FFFFFF' : tipoItem.color }
                  ]}
                >
                  {tipoItem.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Título */}
        <View style={styles.section}>
          <Text style={styles.label}>Título do Evento *</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Consulta pré-natal, Comprar vitaminas..."
            placeholderTextColor="#C7C7C7"
            maxLength={100}
          />
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.label}>Descrição (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Adicione detalhes sobre o evento..."
            placeholderTextColor="#C7C7C7"
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </View>

        {/* Data e Hora */}
        <View style={styles.section}>
          <Text style={styles.label}>Data e Hora</Text>
          
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#8B5FBF" />
              <Text style={styles.dateTimeText}>{formatDate(data)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={20} color="#8B5FBF" />
              <Text style={styles.dateTimeText}>{formatTime(hora)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Salvar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSalvar}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Salvar Evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8B5FBF',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  tipoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tipoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    minWidth: 120,
  },
  tipoButtonActive: {
    backgroundColor: '#8B5FBF',
  },
  tipoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipoButtonTextActive: {
    color: '#FFFFFF',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: '#8B5FBF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default CriarEventoScreen;