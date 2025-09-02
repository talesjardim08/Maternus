import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './home';

export default function Saude({navigation, currentUser}) {
  const [currentScreen, setCurrentScreen] = useState('HealthMain');
  const screen = navigation
  const HealthMain = ({navigation}) => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
  
        <LinearGradient
          colors={["#8B5CF6", "#A855F7", "#C084FC"]}
          style={styles.fullScreen}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} // agora volta para a tela anterior
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          {/* Botão Voltar */}
  
          {/* Conteúdo centralizado */}
          <View style={styles.centerContent}>
            <View style={styles.headerInfo}>
              <View style={styles.iconContainer}>
                <Ionicons name="heart" size={22} color="white" />
              </View>
              <Text style={styles.headerTitle}>Saúde</Text>
            </View>
  
            <Text style={styles.subtitle}>
              Administre a sua saúde e a do seu bebê com informações cadastradas
              no aplicativo
            </Text>
  
            {/* Card da usuária */}
            <TouchableOpacity
              style={styles.userCard}
              onPress={() => navigation.navigate("Profile", { currentUser })}
            >
              <View style={styles.userIconContainer}>
                <Ionicons name="person" size={22} color="white" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Maria da Silva (EU)</Text>
                <Text style={styles.userRole}>Gestante</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  };
  
  

  // Tela de Perfil da Usuária (Anexo 2)
  const UserProfile = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com info da usuária */}
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={20} color="white" />
            </View>
            <View>
              <Text style={styles.userId}>123.456.789-09</Text>
              <Text style={styles.userNameHeader}>Nome: Maria da Silva (EU)</Text>
            </View>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabText}>Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setCurrentScreen('Vaccination')}
          >
            <Text style={styles.tabText}>Vacinação</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por palavra chave"
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>
        </View>
        
        {/* Condições de saúde pré-existentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condições de saúde pré-existentes:</Text>
          
          <View style={styles.conditionCard}>
            <Text style={styles.conditionTitle}>Diabetes Gestacional</Text>
            <Text style={styles.conditionSubtitle}>Descrição / Observações clínicas</Text>
            <Text style={styles.conditionDescription}>
              Diagnosticado no segundo trimestre. Monitorar glicemia diariamente.
            </Text>
            <Text style={styles.conditionInfo}>
              <Text style={styles.conditionLabel}>Grau de risco / Classificação de gravidade (se aplicável):</Text>
              {'\n'}Moderado
            </Text>
            <Text style={styles.conditionInfo}>
              <Text style={styles.conditionLabel}>Data da última atualização dessa informação:</Text>
              {'\n'}05/08/2025
            </Text>
          </View>
        </View>
        
        {/* Restrições e indicações */}
        <View style={styles.section}>
          <Text style={styles.sectionMainTitle}>
            Saiba as principais restrições e indicações durante a gestação
          </Text>
          
          <View style={styles.categoryGrid}>
            <TouchableOpacity 
              style={[styles.categoryCard, { backgroundColor: '#10B981' }]}
              onPress={() => setCurrentScreen('MythsAndTruths')}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="checkmark-circle" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Mitos e verdades</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryCard, { backgroundColor: '#3B82F6' }]}
              onPress={() => setCurrentScreen('RestrictedActivities')}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="fitness" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Atividades não indicadas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryCard, { backgroundColor: '#EC4899' }]}
              onPress={() => setCurrentScreen('FoodRestrictions')}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="restaurant" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Restrições alimentares</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryCard, { backgroundColor: '#8B5CF6' }]}
              onPress={() => setCurrentScreen('ContraindicatedMeds')}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="medical" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Medicamentos contraindicados</Text>
            </TouchableOpacity>
          </View>
          
          {/* Segunda barra de pesquisa */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel" size={16} color="#8B5CF6" />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="baby" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#EC4899" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Tela de Mitos e Verdades
  const MythsAndTruths = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="heart" size={20} color="white" />
            </View>
            <Text style={styles.headerTitle}>Saiba as principais restrições e indicações durante a gestação</Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNav}>
          <TouchableOpacity style={styles.categoryNavItem}>
            <View style={[styles.categoryNavIcon, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Mitos e verdades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('RestrictedActivities')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Atividades não indicadas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('FoodRestrictions')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Restrições alimentares</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('ContraindicatedMeds')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Medicamentos contraindicados</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel" size={16} color="#8B5CF6" />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.contentTitle}>Principais mitos e verdades sobre a gravidez</Text>
            
            <View style={styles.mythCard}>
              <Text style={styles.mythTitle}>Comer abacaxi durante a gravidez não provoca parto prematuro</Text>
              <Text style={styles.mythDescription}>
                O abacaxi é uma fruta segura durante a gestação e não há evidências científicas de que cause contrações ou parto prematuro. Rico em vitamina C e fibras, pode ser consumido normalmente.
              </Text>
            </View>
            
            <View style={styles.mythCard}>
              <Text style={styles.mythTitle}>Exercícios físicos são recomendados na gravidez</Text>
              <Text style={styles.mythDescription}>
                Atividades físicas adequadas fortalecem o corpo, melhoram o humor e preparam para o parto. Sempre consulte seu médico antes de iniciar qualquer atividade.
              </Text>
            </View>
            
            <View style={styles.mythCard}>
              <Text style={styles.mythTitle}>Não é necessário comer por dois</Text>
              <Text style={styles.mythDescription}>
                O importante é a qualidade dos alimentos, não a quantidade. O aumento calórico necessário é moderado e varia conforme o trimestre da gestação.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="baby" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#EC4899" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Tela de Atividades Não Indicadas
  const RestrictedActivities = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="heart" size={20} color="white" />
            </View>
            <Text style={styles.headerTitle}>Saiba as principais restrições e indicações durante a gestação</Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNav}>
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('MythsAndTruths')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Mitos e verdades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryNavItem}>
            <View style={[styles.categoryNavIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Atividades não indicadas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('FoodRestrictions')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Restrições alimentares</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('ContraindicatedMeds')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Medicamentos contraindicados</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel" size={16} color="#8B5CF6" />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCard, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.contentTitle}>Atividades não indicadas</Text>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="bicycle" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Andar de bicicleta na rua</Text>
                <Text style={styles.activityDescription}>
                  Apesar de parecer uma atividade leve, o risco de queda aumenta com o crescimento da barriga. Bicicletas estacionárias são uma alternativa mais segura para o bebê.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="walk" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Praticar corrida intensa</Text>
                <Text style={styles.activityDescription}>
                  O impacto repetitivo pode sobrecarregar as articulações e demais estruturas corporais. Caminhadas e natação são opções mais seguras.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="barbell" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Levantamento de peso excessivo</Text>
                <Text style={styles.activityDescription}>
                  Exercícios com cargas muito pesadas podem causar lesões e aumentar a pressão abdominal. Prefira pesos leves com supervisão profissional.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="baby" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#EC4899" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Tela de Restrições Alimentares
  const FoodRestrictions = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="heart" size={20} color="white" />
            </View>
            <Text style={styles.headerTitle}>Saiba as principais restrições e indicações durante a gestação</Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNav}>
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('MythsAndTruths')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Mitos e verdades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('RestrictedActivities')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Atividades não indicadas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryNavItem}>
            <View style={[styles.categoryNavIcon, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Restrições alimentares</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('ContraindicatedMeds')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Medicamentos contraindicados</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel" size={16} color="#8B5CF6" />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCard, { backgroundColor: '#EC4899' }]}>
            <Text style={styles.contentTitle}>Comidas expressamente proibidas</Text>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="nutrition" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Carnes cruas ou mal cozidas</Text>
                <Text style={styles.activityDescription}>
                  Há um pequeno risco de contrair toxoplasmose ao consumir carne crua ou mal cozida, o que pode causar complicações espontâneas. Carnes de boca podem conter resíduos de chumbo, o que também representa um risco para a saúde do bebê.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="egg" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Ovos crus ou alimentos preparados com ovos crus</Text>
                <Text style={styles.activityDescription}>
                  Maionese caseira, mousse e molhos podem conter salmonela. Esta bactéria pode causar intoxicação alimentar e complicações graves.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="fish" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Peixes com alto teor de mercúrio</Text>
                <Text style={styles.activityDescription}>
                  Tubarão, cavala-rei e peixe-espada contêm altos níveis de mercúrio, que pode afetar o desenvolvimento do sistema nervoso do bebê.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="baby" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#EC4899" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Tela de Medicamentos Contraindicados
  const ContraindicatedMeds = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="heart" size={20} color="white" />
            </View>
            <Text style={styles.headerTitle}>Saiba as principais restrições e indicações durante a gestação</Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNav}>
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('MythsAndTruths')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Mitos e verdades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('RestrictedActivities')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Atividades não indicadas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItem, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('FoodRestrictions')}
          >
            <View style={[styles.categoryNavIcon, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Restrições alimentares</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryNavItem}>
            <View style={[styles.categoryNavIcon, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavText}>Medicamentos contraindicados</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel" size={16} color="#8B5CF6" />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCard, { backgroundColor: '#8B5CF6' }]}>
            <Text style={styles.contentTitle}>Medicamentos contraindicados</Text>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="medical" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>O uso de Ibuprofeno</Text>
                <Text style={styles.activityDescription}>
                  Ele pode afetar o desenvolvimento do coração do bebê e reduzir o líquido amniótico. Paracetamol é geralmente considerado mais seguro.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="tablet-portrait" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Uso de Isotretinoína</Text>
                <Text style={styles.activityDescription}>
                  O uso para tratamento de acne, mesmo em pequenas doses podem causar malformações fetais graves. Mulheres que usam este medicamento devem evitar engravidar.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="pill" size={28} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Aspirina em altas doses</Text>
                <Text style={styles.activityDescription}>
                  Pode causar problemas de sangramento e afetar o fechamento de estruturas cardíacas do feto. Baixas doses podem ser prescritas em casos específicos.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="baby" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#EC4899" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Tela de Vacinação
  const Vaccination = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={20} color="white" />
            </View>
            <View>
              <Text style={styles.userId}>123.456.789-09</Text>
              <Text style={styles.userNameHeader}>Nome: Maria da Silva</Text>
            </View>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Text style={styles.tabText}>Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabText}>Vacinação</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por palavra chave"
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>
        </View>
        
        <View style={styles.section}>
          {/* Hepatite B */}
          <View style={styles.vaccineCard}>
            <Text style={styles.vaccineTitle}>Hepatite B</Text>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose 1</Text>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusText}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose 2</Text>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusText}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose 3</Text>
              <View style={styles.statusPending}>
                <Text style={styles.statusTextPending}>Pendente</Text>
              </View>
            </View>
          </View>
          
          {/* dTpa adulto */}
          <View style={styles.vaccineCard}>
            <Text style={styles.vaccineTitle}>dTpa adulto (difteria e tétano) - dT</Text>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose Única</Text>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusText}>Concluída</Text>
              </View>
            </View>
          </View>
          
          {/* COVID-19 */}
          <View style={styles.vaccineCard}>
            <Text style={styles.vaccineTitle}>COVID-19</Text>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>1ª Dose</Text>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusText}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>2ª Dose</Text>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusText}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose de Reforço</Text>
              <View style={styles.statusPending}>
                <Text style={styles.statusTextPending}>Pendente</Text>
              </View>
            </View>
          </View>
          
          {/* Influenza */}
          <View style={styles.vaccineCard}>
            <Text style={styles.vaccineTitle}>Influenza (Gripe)</Text>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose Anual</Text>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusText}>Concluída</Text>
              </View>
            </View>
          </View>
          
          {/* Tríplice Acelular */}
          <View style={styles.vaccineCard}>
            <Text style={styles.vaccineTitle}>Tríplice Acelular (dTpa)</Text>
            <View style={styles.doseRow}>
              <Text style={styles.doseText}>Dose Gestacional</Text>
              <View style={styles.statusPending}>
                <Text style={styles.statusTextPending}>Pendente</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="baby" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#EC4899" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Função para renderizar a tela atual
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'HealthMain':
        return <HealthMain navigation={screen}/>;
      case 'UserProfile':
        return <UserProfile />;
      case 'MythsAndTruths':
        return <MythsAndTruths />;
      case 'RestrictedActivities':
        return <RestrictedActivities />;
      case 'FoodRestrictions':
        return <FoodRestrictions />;
      case 'ContraindicatedMeds':
        return <ContraindicatedMeds />;
      case 'Vaccination':
        return <Vaccination />;
      default:
        return <HealthMain />;
    }
  };

  return renderCurrentScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
    fullScreen: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  iconContainer: {
    width: 42,
    height: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  userId: {
    color: 'white',
    fontSize: 12,
    opacity: 0.75,
  },
  userNameHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  userCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  userIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  userRole: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 16,
  },
  sectionMainTitle: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  conditionCard: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  conditionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  conditionSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 12,
  },
  conditionDescription: {
    color: 'white',
    fontSize: 12,
    opacity: 0.75,
    marginBottom: 16,
    lineHeight: 18,
  },
  conditionInfo: {
    color: 'white',
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 18,
  },
  conditionLabel: {
    fontWeight: '500',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  categoryNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'space-between',
  },
  categoryNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryNavIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryNavText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  contentCard: {
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
  },
  contentTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 24,
  },
  mythCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  mythTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    lineHeight: 22,
  },
  mythDescription: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navItem: {
    alignItems: 'center',
  },
  activityItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    lineHeight: 22,
  },
  activityDescription: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
  vaccineCard: {
    backgroundColor: '#DDD6FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  vaccineTitle: {
    color: '#6B46C1',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  doseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doseText: {
    color: '#6B7280',
    fontSize: 14,
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '500',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusTextPending: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '500',
  },
});