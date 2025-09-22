// CampaignsList.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';

function CampaignsList({ campaigns, onCampaignSelect }) {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ type: '', state: '', city: '' });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateData, setSelectedStateData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar estados
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        );
        const data = await response.json();
        const sortedStates = data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setStates(sortedStates);
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Carregar cidades
  const handleStateSelect = async (stateCode, stateName) => {
    if (!stateCode) {
      setCities([]);
      setSelectedStateData(null);
      setFilters((prev) => ({ ...prev, state: '', city: '' }));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`
      );
      const data = await response.json();
      const sortedCities = data.sort((a, b) => a.nome.localeCompare(b.nome));
      setCities(sortedCities);
      setSelectedStateData({ code: stateCode, name: stateName });
      setFilters((prev) => ({ ...prev, state: stateName, city: '' }));
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.institution
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      campaign.focus.toLowerCase().includes(searchText.toLowerCase());

    const matchesType = !filters.type || campaign.type.includes(filters.type);
    const matchesState = !filters.state || campaign.state === filters.state;
    const matchesCity = !filters.city || campaign.city === filters.city;

    return matchesSearch && matchesType && matchesState && matchesCity;
  });

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({ type: '', state: '', city: '' });
    setCities([]);
    setSelectedStateData(null);
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M19 12H5m7-7l-7 7 7 7"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campanhas de Instituições</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Descrição */}
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            Aqui instituições podem criar campanhas de arrecadação ou
            distribuição de itens.
          </Text>
        </View>

        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Busque por campanhas..."
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Text>X</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filtros</Text>
            {(filters.type || filters.state || filters.city) && (
              <TouchableOpacity onPress={clearAllFilters}>
                <Text style={{ color: 'red' }}>Limpar todos</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Tipo */}
          <View style={styles.filterRow}>
            <Text>Tipo:</Text>
            <TouchableOpacity
              style={[
                styles.filterChip,
                filters.type === 'arrecadação' && styles.chipSelected,
              ]}
              onPress={() => toggleFilter('type', 'arrecadação')}
            >
              <Text
                style={[
                  styles.chipText,
                  filters.type === 'arrecadação' && styles.chipTextSelected,
                ]}
              >
                Arrecadação
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                filters.type === 'distribuição' && styles.chipSelected,
              ]}
              onPress={() => toggleFilter('type', 'distribuição')}
            >
              <Text
                style={[
                  styles.chipText,
                  filters.type === 'distribuição' && styles.chipTextSelected,
                ]}
              >
                Distribuição
              </Text>
            </TouchableOpacity>
          </View>

          {/* Estado */}
          <View style={styles.filterRow}>
            <Text>Estado:</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedStateData?.code || ''}
              onValueChange={(value) => {
                const selectedState = states.find(
                  (state) => state.id == value
                );
                if (selectedState) {
                  handleStateSelect(selectedState.id, selectedState.sigla);
                } else {
                  handleStateSelect('', '');
                }
              }}
            >
              <Picker.Item label="Todos os estados" value="" />
              {states.map((state) => (
                <Picker.Item
                  key={state.id}
                  label={`${state.nome} (${state.sigla})`}
                  value={state.id}
                />
              ))}
            </Picker>
          </View>

          {/* Cidade */}
          {selectedStateData && (
            <View style={styles.filterRow}>
              <Text>Cidade:</Text>
              <Picker
                style={styles.picker}
                selectedValue={filters.city}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, city: value }))
                }
              >
                <Picker.Item label="Todas as cidades" value="" />
                {cities.map((city) => (
                  <Picker.Item
                    key={city.id}
                    label={city.nome}
                    value={city.nome}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {loading && <ActivityIndicator size="small" color="#8B5CF6" />}

        {/* Lista */}
        {filteredCampaigns.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma campanha encontrada
          </Text>
        ) : (
          filteredCampaigns.map((campaign) => (
            <TouchableOpacity
              key={campaign.id}
              style={styles.campaignCard}
              onPress={() => onCampaignSelect(campaign)}
            >
              <Image
                source={{ uri: campaign.image }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.institutionName}>
                  {campaign.institution}
                </Text>
                <Text>{campaign.type}</Text>
                <Text>FOCO: {campaign.focus}</Text>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={{ color: 'white' }}>{campaign.action}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
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
    backgroundColor: '#8B5CF6',
    padding: 16,
  },
  backButton: { marginRight: 8 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '600' },
  scrollContent: { padding: 16 },
  descriptionBox: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  description: { color: '#6B7280', fontSize: 14 },
  searchContainer: { marginBottom: 16 },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  clearButton: { position: 'absolute', right: 12, top: 12 },
  filtersContainer: { marginBottom: 16 },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterTitle: { fontWeight: '600', color: '#8B5CF6' },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  chipSelected: { backgroundColor: '#8B5CF6' },
  chipText: { color: '#8B5CF6' },
  chipTextSelected: { color: 'white' },
  picker: {
    flex: 1,
    marginLeft: 8,
  },
  campaignCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 12 },
  institutionName: { fontWeight: '600', color: '#8B5CF6', fontSize: 16 },
  actionButton: {
    marginTop: 8,
    backgroundColor: '#A855F7',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
});

export default CampaignsList;
