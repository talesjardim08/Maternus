// CampaignDetails.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

function CampaignDetails({ campaign, onBack }) {
  const [reminderCreated, setReminderCreated] = useState(false);

  const handleCreateReminder = () => {
    setReminderCreated(true);
    setTimeout(() => {
      setReminderCreated(false);
    }, 3000);
  };

  if (!campaign) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M19 12H5m7-7l-7 7 7 7"
              stroke="#8B5CF6"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{campaign.focus}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagem da campanha */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: campaign.image }} style={styles.mainImage} />
        </View>

        {/* Instituição */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Instituição</Text>
          <View style={styles.fieldValue}>
            <Text>{campaign.institution}</Text>
          </View>
        </View>

        {/* Tipo */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Tipo de Campanha</Text>
          <View style={styles.fieldValue}>
            <Text>{campaign.type}</Text>
          </View>
        </View>

        {/* FOCO */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>FOCO da Campanha</Text>
          <View style={styles.fieldValue}>
            <Text>{campaign.focus}</Text>
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            {campaign.action === 'Quero doar'
              ? 'Endereço para doar:'
              : 'Endereço para receber:'}
          </Text>
          <View style={styles.fieldValue}>
            <Text>{campaign.address}</Text>
          </View>

          <View style={styles.locationTags}>
            <View style={styles.locationTag}>
              <Text style={styles.locationTagText}>
                {campaign.city} ({campaign.state})
              </Text>
            </View>
            <View style={styles.locationTag}>
              <Text style={styles.locationTagText}>{campaign.city}</Text>
            </View>
          </View>
        </View>

        {/* Horários */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Horários disponíveis</Text>
          <View style={styles.hoursContainer}>
            <View style={styles.hourField}>
              <Text style={styles.hourLabel}>De</Text>
              <View style={styles.hourValue}>
                <Text>08:00</Text>
              </View>
            </View>
            <View style={styles.hourField}>
              <Text style={styles.hourLabel}>Até</Text>
              <View style={styles.hourValue}>
                <Text>17:00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Dias */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Dias Disponíveis</Text>
          <View style={styles.fieldValue}>
            <Text>{campaign.days}</Text>
          </View>
        </View>

        {/* Texto informativo */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {campaign.action === 'Quero doar'
              ? 'Para doar basta levar sua doação ao endereço durante os dias e horários especificados.'
              : 'Para receber basta ir ao endereço durante os dias e horários especificados.'}
          </Text>
        </View>

        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status da campanha:</Text>
            <View style={styles.statusValue}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      campaign.status === 'Finalizada'
                        ? '#EF4444'
                        : '#10B981',
                  },
                ]}
              >
                {campaign.status}
              </Text>
              {campaign.status !== 'Finalizada' && (
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path
                    d="M5 13l4 4L19 7"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </View>
          </View>
        </View>

        {/* Botão Criar Lembrete */}
        {campaign.status !== 'Finalizada' && (
          <TouchableOpacity
            style={styles.reminderButton}
            onPress={handleCreateReminder}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" style={{ marginRight: 8 }}>
              <Path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={{ color: 'white', fontWeight: '500' }}>
              Criar um lembrete
            </Text>
          </TouchableOpacity>
        )}

        {/* Mensagem de sucesso */}
        {reminderCreated && (
          <View style={styles.successMessage}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                d="M5 13l4 4L19 7"
                stroke="#10B981"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.successText}>
              Lembrete criado com sucesso! Você será notificada sobre esta
              campanha.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E8FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#F3E8FF',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 18, fontWeight: '500', color: '#8B5CF6', flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  imageContainer: { marginBottom: 24, borderRadius: 12, overflow: 'hidden' },
  mainImage: { width: '100%', height: 250, borderRadius: 12 },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { fontSize: 16, fontWeight: '500', color: '#8B5CF6', marginBottom: 8 },
  fieldValue: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  locationTags: { flexDirection: 'row', gap: 8, marginTop: 12 },
  locationTag: {
    backgroundColor: '#E9D5FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  locationTagText: { color: '#8B5CF6', fontSize: 14, fontWeight: '500' },
  hoursContainer: { flexDirection: 'row', gap: 16 },
  hourField: { flex: 1 },
  hourLabel: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 8,
  },
  hourValue: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  statusContainer: { marginTop: 8, marginBottom: 16 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  statusValue: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusText: { fontSize: 16, fontWeight: '500', fontStyle: 'italic' },
  reminderButton: {
    flexDirection: 'row',
    backgroundColor: '#A855F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  successMessage: {
    flexDirection: 'row',
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  successText: { color: '#065F46', fontSize: 14, fontWeight: '500', marginLeft: 8, flex: 1 },
});

export default CampaignDetails;