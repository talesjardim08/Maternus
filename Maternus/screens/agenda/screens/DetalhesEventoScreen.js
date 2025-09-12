import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const DetalhesEventoScreen = ({ navigation, route }) => {
  const { evento, onEventUpdated, onEventDeleted } = route.params;
  
  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState(evento.titulo);
  const [descricao, setDescricao] = useState(evento.descricao || '');
  const [tipo, setTipo] = useState(evento.tipo);
  const [data, setData] = useState(new Date(evento.data));
  const [hora, setHora] = useState(() => {
    const [hours, minutes] = evento.hora.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const tiposEvento = [
    { id: 'compromisso', label: 'Compromisso', icon: 'calendar-outline', color: '#8B5FBF' },
    { id: 'lembrete', label: 'Lembrete', icon: 'notifications-outline', color: '#FFA726' },
    { id: 'meta', label: 'Meta', icon: 'flag-outline', color: '#66BB6A' },
  ];

  const tipoAtual = tiposEvento.find(t => t.id === tipo);

  const handleSalvar = () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para o evento.');
      return;
    }

    const eventoAtualizado = {
      ...evento,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      tipo,
      data: data.toISOString().split('T')[0],
      hora: hora.toTimeString().slice(0, 5),
      atualizadoEm: new Date().toISOString(),
    };

    onEventUpdated(eventoAtualizado);
    setIsEditing(false);
  };

  const handleCancelar = () => {
    setTitulo(evento.titulo);
    setDescricao(evento.descricao || '');
    setTipo(evento.tipo);
    setData(new Date(evento.data));
    const [hours, minutes] = evento.hora.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    setHora(date);
    setIsEditing(false);
  };

  const handleExcluir = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            onEventDeleted(evento.id);
            navigation.goBack();
          }
        }
      ]
    );
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

  const formatDateLong = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toTimeString().slice(0, 5);
  };

  const formatCreatedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <View style={[styles.headerIconContainer, { backgroundColor: tipoAtual?.color }]}>
          <Ionicons name={tipoAtual?.icon} size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.headerTitle}>Detalhes do Evento</Text>
        
        <View style={styles.headerActions}>
          {!isEditing ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelar}
              >
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSalvar}
              >
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Tipo Badge */}
        <View style={styles.tipoBadgeContainer}>
          <View style={[styles.tipoBadge, { backgroundColor: tipoAtual?.color }]}>
            <Ionicons name={tipoAtual?.icon} size={16} color="#FFFFFF" />
            <Text style={styles.tipoBadgeText}>{tipoAtual?.label}</Text>
          </View>
        </View>

        {/* Título */}
        <View style={styles.section}>
          <Text style={styles.label}>Título</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Título do evento"
              placeholderTextColor="#C7C7C7"
              maxLength={100}
            />
          ) : (
            <Text style={styles.value}>{titulo}</Text>
          )}
        </View>

        {/* Data e Hora */}
        <View style={styles.section}>
          <Text style={styles.label}>Data e Hora</Text>
          {isEditing ? (
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
          ) : (
            <View style={styles.dateTimeInfo}>
              <View style={styles.dateTimeRow}>
                <Ionicons name="calendar-outline" size={20} color="#8B5FBF" />
                <Text style={styles.dateTimeValue}>
                  {formatDateLong(new Date(evento.data))}
                </Text>
              </View>
              <View style={styles.dateTimeRow}>
                <Ionicons name="time-outline" size={20} color="#8B5FBF" />
                <Text style={styles.dateTimeValue}>{evento.hora}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Tipo (apenas em edição) */}
        {isEditing && (
          <View style={styles.section}>
            <Text style={styles.label}>Tipo de Evento</Text>
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
                    size={16}
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
        )}

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.label}>Descrição</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição do evento..."
              placeholderTextColor="#C7C7C7"
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          ) : (
            <Text style={[styles.value, { lineHeight: 22 }]}>
              {descricao || 'Sem descrição'}
            </Text>
          )}
        </View>

        {/* Informações do Sistema */}
        <View style={styles.systemInfo}>
          <Text style={styles.systemInfoTitle}>Informações do Sistema</Text>
          <View style={styles.systemInfoRow}>
            <Ionicons name="time-outline" size={16} color="#8B5FBF" />
            <Text style={styles.systemInfoText}>
              Criado em: {formatCreatedDate(evento.criadoEm)}
            </Text>
          </View>
          {evento.atualizadoEm && (
            <View style={styles.systemInfoRow}>
              <Ionicons name="pencil-outline" size={16} color="#8B5FBF" />
              <Text style={styles.systemInfoText}>
                Atualizado em: {formatCreatedDate(evento.atualizadoEm)}
              </Text>
            </View>
          )}
        </View>

        {/* Botão Excluir */}
        {!isEditing && (
          <View style={styles.dangerZone}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleExcluir}
              activeOpacity={0.8}
            >
              <Ionicons name="trash-outline" size={20} color="#FF4444" />
              <Text style={styles.deleteButtonText}>Excluir Evento</Text>
            </TouchableOpacity>
          </View>
        )}
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
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#66BB6A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  tipoBadgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  tipoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tipoBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5FBF',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  dateTimeInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTimeValue: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  tipoButtonActive: {
    backgroundColor: '#8B5FBF',
  },
  tipoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  tipoButtonTextActive: {
    color: '#FFFFFF',
  },
  systemInfo: {
    backgroundColor: '#F8F4FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  systemInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginBottom: 12,
  },
  systemInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  systemInfoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  dangerZone: {
    marginBottom: 32,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4444',
    marginLeft: 8,
  },
});

export default DetalhesEventoScreen;
