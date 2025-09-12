
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AgendaPessoalTab from './AgendaPessoalTab';

const AgendaScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('agendados');
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const filterOptions = [
    { id: 'todos', label: 'Todos' },
    { id: 'consulta', label: 'Consulta' },
    { id: 'exames', label: 'Exames' },
    { id: 'retornos', label: 'Retornos' },
    { id: 'outros', label: 'Outros' },
  ];
  
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailsModalVisible(true);
  };
  
  const handleDownloadPDF = (pdfName) => {
    Alert.alert('Download PDF', `Baixando: ${pdfName}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'agendados':
        return (
          <ScrollView 
            style={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#8B5FBF" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Busque por especialidade ou local"
                  placeholderTextColor="#C7C7C7"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
              <TouchableOpacity 
                style={styles.filterButton}
                onPress={() => setShowFilterModal(true)}
              >
                <Ionicons name="filter-outline" size={20} color="#8B5FBF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentDate}>05/03/2025</Text>
                <Text style={styles.proximoText}>Mais próximo</Text>
              </View>
              <Text style={styles.appointmentType}>Atendimento: Consulta</Text>
              <Text style={styles.appointmentSpecialty}>Especialidade: Obstetrícia</Text>
              <Text style={styles.appointmentTime}>Horário: 14:30</Text>
              <Text style={styles.appointmentLocation}>Local: Hospital Minha Vida, Rua Angélica - Jd Santana, N° 50, São Paulo, SP</Text>
              <View style={styles.observationContainer}>
                <Text style={styles.observationTitle}>Observação importante:</Text>
                <Text style={styles.observationText}>Não se esqueça do seu cartão de saúde</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => handleViewDetails({
                  date: '05/03/2025',
                  type: 'Consulta',
                  specialty: 'Obstetrícia',
                  time: '14:30',
                  location: 'Hospital Minha Vida',
                  observation: 'Não se esqueça do seu cartão de saúde'
                })}
              >
                <Text style={styles.viewButtonText}>Visualizar</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentDate}>08/03/2025</Text>
              </View>
              <Text style={styles.appointmentType}>Atendimento: Consulta</Text>
              <Text style={styles.appointmentSpecialty}>Especialidade: Obstetrícia</Text>
              <Text style={styles.appointmentTime}>Horário: 09:00</Text>
              <Text style={styles.appointmentLocation}>Local: Hospital Minha Vida, Rua Angélica - Jd Santana, N° 50, São Paulo, SP</Text>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => handleViewDetails({
                  date: '08/03/2025',
                  type: 'Consulta',
                  specialty: 'Obstetrícia',
                  time: '09:00',
                  location: 'Hospital Minha Vida'
                })}
              >
                <Text style={styles.viewButtonText}>Visualizar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
      case 'historico':
        return (
          <ScrollView 
            style={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#8B5FBF" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Busque por especialidade ou local"
                  placeholderTextColor="#C7C7C7"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
              <TouchableOpacity 
                style={styles.filterButton}
                onPress={() => setShowFilterModal(true)}
              >
                <Ionicons name="filter-outline" size={20} color="#8B5FBF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.recentText}>Recentes</Text>
            
            <View style={styles.historyCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentDate}>25/02/2025</Text>
              </View>
              <Text style={styles.appointmentType}>Atendimento: Consulta</Text>
              <Text style={styles.appointmentSpecialty}>Especialidade: Dermatologia</Text>
              <Text style={styles.appointmentTime}>Horário: 10:00</Text>
              <Text style={styles.appointmentLocation}>Local: Hospital Minha Vida, Rua Angélica - Jd Santana, N° 50, São Paulo, SP</Text>
              
              <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Resultados:</Text>
                <View style={styles.resultItem}>
                  <View style={styles.resultInfo}>
                    <Ionicons name="document-outline" size={16} color="#8B5FBF" />
                    <Text style={styles.resultText}>Res. Cons. CPF 123456789071</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.downloadButton}
                    onPress={() => handleDownloadPDF('Res. Cons. CPF 123456789071')}
                  >
                    <Ionicons name="download-outline" size={16} color="#8B5FBF" />
                    <Text style={styles.downloadButtonText}>Baixar PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <Text style={styles.olderText}>Mais Antigos</Text>
            
            <View style={styles.historyCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentDate}>15/01/2025</Text>
              </View>
              <Text style={styles.appointmentType}>Atendimento: Exame</Text>
              <Text style={styles.appointmentSpecialty}>Especialidade: Ultrassonografia</Text>
              <Text style={styles.appointmentTime}>Horário: 08:30</Text>
              <Text style={styles.appointmentLocation}>Local: Clínica Diagnóstica São Paulo</Text>
            </View>
          </ScrollView>
        );
      case 'pessoal':
        return <AgendaPessoalTab navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B5FBF" barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerIconContainer}>
            <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Agenda</Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Visualize todos os atendimentos marcados para você, mamãe!
          </Text>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'agendados' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('agendados')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'agendados' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Agendados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'historico' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('historico')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'historico' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Histórico
          </Text>
        </TouchableOpacity>

        <View style={styles.tabSpacer} />
        <TouchableOpacity
          style={[
            styles.tab,
            styles.pessoalTab,
            activeTab === 'pessoal' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('pessoal')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pessoal' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Agenda Pessoal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por:</Text>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.filterOption,
                  selectedFilter === option.id && styles.filterOptionSelected
                ]}
                onPress={() => {
                  setSelectedFilter(option.id);
                  setShowFilterModal(false);
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedFilter === option.id && styles.filterOptionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Details Modal */}
      <Modal
        visible={detailsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Compromisso</Text>
            {selectedAppointment && (
              <>
                <Text style={styles.detailText}>Data: {selectedAppointment.date}</Text>
                <Text style={styles.detailText}>Tipo: {selectedAppointment.type}</Text>
                <Text style={styles.detailText}>Especialidade: {selectedAppointment.specialty}</Text>
                <Text style={styles.detailText}>Horário: {selectedAppointment.time}</Text>
                <Text style={styles.detailText}>Local: {selectedAppointment.location}</Text>
                {selectedAppointment.observation && (
                  <Text style={styles.detailText}>Observação: {selectedAppointment.observation}</Text>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDetailsModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  subtitleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#8B5FBF',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#8B5FBF',
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tabSpacer: {
    width: 20,
  },
  pessoalTab: {
    marginLeft: 20,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appointmentCard: {
    backgroundColor: '#D1C4E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E35B1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  proximoText: {
    fontSize: 12,
    color: '#8B5FBF',
    fontWeight: '600',
  },
  appointmentType: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontWeight: '600',
  },
  appointmentSpecialty: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  appointmentLocation: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  observationContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  observationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5FBF',
    marginBottom: 4,
  },
  observationText: {
    fontSize: 14,
    color: '#666',
  },
  historyCard: {
    backgroundColor: '#E8EAF6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  recentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5FBF',
    marginBottom: 12,
  },
  olderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5FBF',
    marginBottom: 12,
    marginTop: 8,
  },
  resultContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D1C4E9',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
  resultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8B5FBF',
  },
  downloadButtonText: {
    fontSize: 12,
    color: '#8B5FBF',
    marginLeft: 4,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#8B5FBF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#E8F5E8',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
  filterOptionTextSelected: {
    color: '#8B5FBF',
    fontWeight: '600',
  },
  modalCloseButton: {
    backgroundColor: '#8B5FBF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default AgendaScreen;
