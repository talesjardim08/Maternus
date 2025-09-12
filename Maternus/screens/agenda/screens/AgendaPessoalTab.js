import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do calendário em português
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const AgendaPessoalTab = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventos, setEventos] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    loadEventos();
  }, []);

  useEffect(() => {
    updateMarkedDates();
  }, [eventos]);

  const loadEventos = async () => {
    try {
      const savedEventos = await AsyncStorage.getItem('eventosAgendaPessoal');
      if (savedEventos) {
        setEventos(JSON.parse(savedEventos));
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const saveEventos = async (novosEventos) => {
    try {
      await AsyncStorage.setItem('eventosAgendaPessoal', JSON.stringify(novosEventos));
    } catch (error) {
      console.error('Erro ao salvar eventos:', error);
    }
  };

  const updateMarkedDates = () => {
    const marked = {};
    eventos.forEach(evento => {
      marked[evento.data] = {
        marked: true,
        dotColor: '#8B5FBF',
        activeOpacity: 0.7,
      };
    });
    setMarkedDates(marked);
  };

  const getProximosEventos = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    return eventos
      .filter(evento => new Date(evento.data) >= hoje)
      .sort((a, b) => new Date(a.data) - new Date(b.data))
      .slice(0, 5);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString || '00:00';
  };

  const getEventIcon = (tipo) => {
    switch (tipo) {
      case 'lembrete':
        return 'notifications-outline';
      case 'meta':
        return 'flag-outline';
      case 'compromisso':
        return 'calendar-outline';
      default:
        return 'calendar-outline';
    }
  };

  const getEventColor = (tipo) => {
    switch (tipo) {
      case 'lembrete':
        return '#FFA726';
      case 'meta':
        return '#66BB6A';
      case 'compromisso':
        return '#8B5FBF';
      default:
        return '#8B5FBF';
    }
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleCreateEvento = () => {
    navigation.navigate('CriarEvento', {
      selectedDate,
      onEventCreated: (novoEvento) => {
        const novosEventos = [...eventos, novoEvento];
        setEventos(novosEventos);
        saveEventos(novosEventos);
      }
    });
  };

  const handleEventPress = (evento) => {
    navigation.navigate('DetalhesEvento', {
      evento,
      onEventUpdated: (eventoAtualizado) => {
        const novosEventos = eventos.map(e => 
          e.id === eventoAtualizado.id ? eventoAtualizado : e
        );
        setEventos(novosEventos);
        saveEventos(novosEventos);
      },
      onEventDeleted: (eventoId) => {
        const novosEventos = eventos.filter(e => e.id !== eventoId);
        setEventos(novosEventos);
        saveEventos(novosEventos);
      }
    });
  };

  const proximosEventos = getProximosEventos();

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Calendário */}
        <View style={styles.calendarContainer}>
          <Calendar
            current={new Date().toISOString().split('T')[0]}
            onDayPress={onDayPress}
            markedDates={{
              ...markedDates,
              [selectedDate]: {
                ...markedDates[selectedDate],
                selected: true,
                selectedColor: '#A569D1',
              }
            }}
            theme={{
              backgroundColor: '#FFFFFF',
              calendarBackground: '#FFFFFF',
              textSectionTitleColor: '#8B5FBF',
              selectedDayBackgroundColor: '#A569D1',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#8B5FBF',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#8B5FBF',
              selectedDotColor: '#FFFFFF',
              arrowColor: '#8B5FBF',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#8B5FBF',
              indicatorColor: '#8B5FBF',
              textDayFontFamily: 'System',
              textMonthFontFamily: 'System',
              textDayHeaderFontFamily: 'System',
              textDayFontWeight: '400',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14
            }}
          />
        </View>

        {/* Próximos Eventos */}
        <View style={styles.eventosContainer}>
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>
          
          {proximosEventos.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#C7C7C7" />
              <Text style={styles.emptyStateTitle}>Nenhum evento agendado</Text>
              <Text style={styles.emptyStateText}>
                Toque no botão + para criar seu primeiro evento pessoal
              </Text>
            </View>
          ) : (
            proximosEventos.map((evento) => (
              <TouchableOpacity
                key={evento.id}
                style={styles.eventoCard}
                onPress={() => handleEventPress(evento)}
              >
                <View style={styles.eventoHeader}>
                  <View style={styles.eventoIconContainer}>
                    <Ionicons
                      name={getEventIcon(evento.tipo)}
                      size={20}
                      color={getEventColor(evento.tipo)}
                    />
                  </View>
                  <View style={styles.eventoInfo}>
                    <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
                    <Text style={styles.eventoData}>
                      {formatDate(evento.data)} às {formatTime(evento.hora)}
                    </Text>
                    {evento.descricao && (
                      <Text style={styles.eventoDescricao} numberOfLines={2}>
                        {evento.descricao}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.tipoIndicator, { backgroundColor: getEventColor(evento.tipo) }]}>
                    <Text style={styles.tipoText}>{evento.tipo}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateEvento}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 8,
  },
  eventosContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Espaço para o FAB
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  eventoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventoData: {
    fontSize: 14,
    color: '#8B5FBF',
    fontWeight: '600',
    marginBottom: 4,
  },
  eventoDescricao: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  tipoIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  tipoText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B5FBF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});

export default AgendaPessoalTab;
