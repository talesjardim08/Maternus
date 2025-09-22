// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CampaignsList from './CampaingsList';    // ATENÇÃO: nome certo
import CampaignDetails from './CampaingDetails';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    {
      id: '1',
      institution: 'Hospital São Bento',
      type: 'Campanha de distribuição de doações',
      focus: 'Fraldas de vários tamanhos',
      action: 'Quero receber',
      image: 'https://images.unsplash.com/photo-1544378730-6f31502d6dd4?w=400&h=250&fit=crop',
      address: 'R. São Bento - nº 123 - Centro - CEP 01234567',
      city: 'São Paulo',
      state: 'SP',
      hours: 'De 08:00 - Até 18:00',
      days: 'Do dia 01/06 até o dia 31/07',
      status: 'Em andamento'
    },
    {
      id: '2', 
      institution: 'Hospital Minha Vida',
      type: 'Campanha de arrecadação de doações',
      focus: 'Roupas para RN (Recém Nascido)',
      action: 'Quero doar',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      address: 'R. Anísio - nº 50 - Jd. Maria - CEP 09730840',
      city: 'Cotia',
      state: 'SP',
      hours: 'De 08:00 - Até 17:00',
      days: 'Do dia 02/06 até o dia 30/06',
      status: 'Em andamento'
    },
    {
      id: '3',
      institution: 'Maternidade Dra Ana Maria',
      type: 'Campanha de arrecadação de doações', 
      focus: 'Fraldas para RN (Recém Nascido)',
      action: 'Quero doar',
      image: 'https://images.unsplash.com/photo-1544378730-6f31502d6dd4?w=400&h=250&fit=crop',
      address: 'Av. Ana Maria - nº 789 - Vila Nova - CEP 05567890',
      city: 'Campinas',
      state: 'SP',
      hours: 'De 09:00 - Até 16:00',
      days: 'Do dia 15/06 até o dia 15/08',
      status: 'Em andamento'
    },
    {
      id: '4',
      institution: 'Hospital Santa Casa',
      type: 'Campanha de distribuição de doações',
      focus: 'Medicamentos para gestantes',
      action: 'Quero receber',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      address: 'R. Santa Casa - nº 456 - Centro - CEP 12345678',
      city: 'Santos',
      state: 'SP',
      hours: 'De 07:00 - Até 19:00',
      days: 'Do dia 10/06 até o dia 20/07',
      status: 'Finalizada'
    },
    {
      id: '5',
      institution: 'Maternidade Bela Vista',
      type: 'Campanha de arrecadação de doações',
      focus: 'Itens de higiene para bebês',
      action: 'Quero doar',
      image: 'https://images.unsplash.com/photo-1544378730-6f31502d6dd4?w=400&h=250&fit=crop',
      address: 'R. Bela Vista - nº 321 - Bela Vista - CEP 98765432',
      city: 'Rio de Janeiro',
      state: 'RJ',
      hours: 'De 08:30 - Até 17:30',
      days: 'Do dia 05/06 até o dia 05/09',
      status: 'Em andamento'
    },
    {
      id: '6',
      institution: 'UBS Vila Nova',
      type: 'Campanha de distribuição de doações',
      focus: 'Kits de maternidade',
      action: 'Quero receber',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      address: 'Av. das Flores - nº 890 - Vila Nova - CEP 30123456',
      city: 'Belo Horizonte',
      state: 'MG',
      hours: 'De 08:00 - Até 16:00',
      days: 'Do dia 20/06 até o dia 20/08',
      status: 'Em andamento'
    },
    {
      id: '7',
      institution: 'Hospital Maternia',
      type: 'Campanha de arrecadação de doações',
      focus: 'Roupas e acessórios para bebês',
      action: 'Quero doar',
      image: 'https://images.unsplash.com/photo-1544378730-6f31502d6dd4?w=400&h=250&fit=crop',
      address: 'R. das Palmeiras - nº 567 - Centro - CEP 80123456',
      city: 'Curitiba',
      state: 'PR',
      hours: 'De 09:00 - Até 17:00',
      days: 'Do dia 01/07 até o dia 31/08',
      status: 'Em andamento'
    },
    {
      id: '8',
      institution: 'Maternidade Nossa Senhora',
      type: 'Campanha de distribuição de doações',
      focus: 'Enxoval completo para bebês',
      action: 'Quero receber',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      address: 'Av. Principal - nº 234 - Jardim América - CEP 70123456',
      city: 'Brasília',
      state: 'DF',
      hours: 'De 08:00 - Até 18:00',
      days: 'Do dia 15/06 até o dia 15/09',
      status: 'Em andamento'
    },
    {
      id: '9',
      institution: 'Hospital Vida Nova',
      type: 'Campanha de arrecadação de doações',
      focus: 'Produtos de higiene para gestantes',
      action: 'Quero doar',
      image: 'https://images.unsplash.com/photo-1544378730-6f31502d6dd4?w=400&h=250&fit=crop',
      address: 'R. da Esperança - nº 456 - Boa Vista - CEP 50123456',
      city: 'Recife',
      state: 'PE',
      hours: 'De 07:30 - Até 16:30',
      days: 'Do dia 10/07 até o dia 10/09',
      status: 'Em andamento'
    },
    {
      id: '10',
      institution: 'Centro de Saúde da Mulher',
      type: 'Campanha de distribuição de doações',
      focus: 'Vitaminas e suplementos',
      action: 'Quero receber',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      address: 'Av. Sete de Setembro - nº 123 - Centro - CEP 40123456',
      city: 'Salvador',
      state: 'BA',
      hours: 'De 08:00 - Até 17:00',
      days: 'Do dia 25/06 até o dia 25/08',
      status: 'Em andamento'
    }
  ];

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setCurrentScreen('details');
  };

  const handleBack = () => {
    setCurrentScreen('campaigns');
    setSelectedCampaign(null);
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'campaigns' && (
        <CampaignsList
          campaigns={campaigns}
          onCampaignSelect={handleCampaignSelect}
        />
      )}

      {currentScreen === 'details' && (
        <CampaignDetails
          campaign={selectedCampaign}
          onBack={handleBack}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  }
});
