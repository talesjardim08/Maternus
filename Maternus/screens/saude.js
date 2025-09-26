import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Saude({navigation, currentUser}) {
  const [currentScreen, setCurrentScreen] = useState('HealthMain');

  // Função corrigida para navegar de volta
  const handleBackToDashboard = () => {
    console.log('Tentando navegar para Main...');
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Aviso', 'Navegação não disponível');
    }
  };

  const HealthMain = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />

      <LinearGradient
        colors={["#8B5CF6", "#A855F7", "#C084FC"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Botão de voltar corrigido */}
        <TouchableOpacity
          style={styles.backButtonCorrected}
          onPress={handleBackToDashboard}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.backButtonTextCorrected}>Voltar</Text>
        </TouchableOpacity>

        {/* Header CORRIGIDO - Ícone separado do texto */}
        <View style={{ paddingHorizontal: 24, paddingTop: 60 }}>
          <View style={styles.headerInfoCorrected}>
            <View style={styles.iconContainerCorrected}>
              <Ionicons name="heart" size={28} color="white" />
            </View>
            <Text style={styles.headerTitleCorrected}>Saúde</Text>
          </View>

          <Text style={styles.subtitleCorrected}>
            Administre a sua saúde e a do seu bebê com informações cadastradas no aplicativo
          </Text>

          <TouchableOpacity
            style={styles.userCardCorrected}
            onPress={() => setCurrentScreen("UserProfile")}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.15)"]}
              style={styles.userCardGradient}
            >
              <View style={styles.userIconContainerCorrected}>
                <Ionicons name="person" size={24} color="white" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userNameCorrected}>{currentUser?.name || "Maria da Silva (EU)"}</Text>
                <Text style={styles.userRoleCorrected}>{currentUser?.role || "Gestante"}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );

  // Tela de Perfil da Usuária - CORRIGIDA (ícone fora da tab e nome visível)
  const UserProfile = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <LinearGradient
        colors={["#8B5CF6", "#A855F7", "#C084FC"]}
        style={styles.headerCorrected}
      >
        <TouchableOpacity 
          style={styles.backButtonCorrected}
          onPress={() => setCurrentScreen('HealthMain')}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.backButtonTextCorrected}>Voltar</Text>
        </TouchableOpacity>

        {/* CORREÇÃO: Ícone separado e nome visível */}
        <View style={styles.profileHeaderCorrected}>
          <View style={styles.profileIconContainerCorrected}>
            <Ionicons name="person" size={24} color="white" />
          </View>
          <View style={styles.profileTextContainerCorrected}>
            <Text style={styles.userIdCorrected}>123.456.789-09</Text>
            <Text style={styles.userNameHeaderCorrected} numberOfLines={1} ellipsizeMode="tail">
              Nome: {currentUser?.name || "Maria da Silva (EU)"}
            </Text>
          </View>
        </View>

        <View style={styles.tabContainerCorrected}>
          <TouchableOpacity style={[styles.tabCorrected, styles.activeTabCorrected]}>
            <Text style={styles.tabTextCorrected}>Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabCorrected}
            onPress={() => setCurrentScreen("Vaccination")}
          >
            <Text style={styles.tabTextCorrected}>Vacinação</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCorrected}
      >
        <View style={styles.searchContainerCorrected}>
          <View style={styles.searchBarCorrected}>
            <TextInput
              style={styles.searchInputCorrected}
              placeholder="Buscar por palavra chave"
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>
        </View>

        {/* Condições de saúde */}
        <View style={styles.sectionCorrected}>
          <Text style={styles.sectionTitleCorrected}>Condições de saúde pré-existentes:</Text>

          <View style={styles.conditionCardCorrected}>
            <LinearGradient
              colors={["#8B5CF6", "#A855F7"]}
              style={styles.conditionGradient}
            >
              <Text style={styles.conditionTitleCorrected}>Diabetes Gestacional</Text>
              <Text style={styles.conditionSubtitleCorrected}>Descrição / Observações clínicas</Text>
              <Text style={styles.conditionDescriptionCorrected}>
                Diagnosticado no segundo trimestre. Monitorar glicemia diariamente.
              </Text>
              <Text style={styles.conditionInfoCorrected}>
                <Text style={styles.conditionLabelCorrected}>
                  Grau de risco / Classificação de gravidade (se aplicável):
                </Text>
                {"\n"}Moderado
              </Text>
              <Text style={styles.conditionInfoCorrected}>
                <Text style={styles.conditionLabelCorrected}>
                  Data da última atualização dessa informação:
                </Text>
                {"\n"}05/08/2025
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Restrições e indicações */}
        <View style={styles.sectionCorrected}>
          <Text style={styles.sectionMainTitleCorrected}>
            Saiba as principais restrições e indicações durante a gestação
          </Text>

          <View style={styles.categoryGridCorrected}>
            <TouchableOpacity
              style={[styles.categoryCardCorrected, { backgroundColor: "#10B981" }]}
              onPress={() => setCurrentScreen("MythsAndTruths")}
            >
              <View style={styles.categoryIconCorrected}>
                <Ionicons name="checkmark-circle" size={28} color="white" />
              </View>
              <Text style={styles.categoryTextCorrected}>Mitos e verdades</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryCardCorrected, { backgroundColor: "#3B82F6" }]}
              onPress={() => setCurrentScreen("RestrictedActivities")}
            >
              <View style={styles.categoryIconCorrected}>
                <Ionicons name="fitness" size={28} color="white" />
              </View>
              <Text style={styles.categoryTextCorrected}>Atividades não indicadas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryCardCorrected, { backgroundColor: "#EC4899" }]}
              onPress={() => setCurrentScreen("FoodRestrictions")}
            >
              <View style={styles.categoryIconCorrected}>
                <Ionicons name="restaurant" size={28} color="white" />
              </View>
              <Text style={styles.categoryTextCorrected}>Restrições alimentares</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryCardCorrected, { backgroundColor: "#8B5CF6" }]}
              onPress={() => setCurrentScreen("ContraindicatedMeds")}
            >
              <View style={styles.categoryIconCorrected}>
                <Ionicons name="medical" size={28} color="white" />
              </View>
              <Text style={styles.categoryTextCorrected}>Medicamentos contraindicados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Tela de Mitos e Verdades - CORRIGIDA
  const MythsAndTruths = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#10B981" />
      
      <LinearGradient
        colors={['#10B981', '#34D399']}
        style={styles.headerCorrected}
      >
        <View style={styles.headerContentCorrected}>
          <TouchableOpacity 
            style={styles.backButtonCorrected}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backButtonTextCorrected}>Voltar</Text>
          </TouchableOpacity>
          
          <View style={styles.subHeaderInfoCorrected}>
            <View style={styles.iconContainerCorrected}>
              <Ionicons name="checkmark-circle" size={24} color="white" />
            </View>
            <Text style={styles.subHeaderTitleCorrected} numberOfLines={2}>
              Mitos e verdades
            </Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNavCorrected}>
          <TouchableOpacity style={styles.categoryNavItemCorrected}>
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Mitos e verdades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('RestrictedActivities')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Atividades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('FoodRestrictions')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Alimentação</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('ContraindicatedMeds')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Medicamentos</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCorrected}
      >
        <View style={styles.sectionCorrected}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainerCorrected}>
            <View style={styles.searchBarCorrected}>
              <TextInput
                style={styles.searchInputCorrected}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButtonCorrected}>
            <Ionicons name="funnel" size={16} color="#10B981" />
            <Text style={styles.filterTextCorrected}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCardCorrected, { backgroundColor: '#10B981' }]}>
            <Text style={styles.contentTitleCorrected}>Principais mitos e verdades sobre a gravidez</Text>
            
            <View style={styles.mythCardCorrected}>
              <Text style={styles.mythTitleCorrected}>Comer abacaxi durante a gravidez não provoca parto prematuro</Text>
              <Text style={styles.mythDescriptionCorrected}>
                O abacaxi é uma fruta segura durante a gestação e não há evidências científicas de que cause contrações ou parto prematuro. Rico em vitamina C e fibras, pode ser consumido normalmente.
              </Text>
            </View>
            
            <View style={styles.mythCardCorrected}>
              <Text style={styles.mythTitleCorrected}>Exercícios físicos são recomendados na gravidez</Text>
              <Text style={styles.mythDescriptionCorrected}>
                Atividades físicas adequadas fortalecem o corpo, melhoram o humor e preparam para o parto. Sempre consulte seu médico antes de iniciar qualquer atividade.
              </Text>
            </View>
            
            <View style={styles.mythCardCorrected}>
              <Text style={styles.mythTitleCorrected}>Não é necessário comer por dois</Text>
              <Text style={styles.mythDescriptionCorrected}>
                O importante é a qualidade dos alimentos, não a quantidade. O aumento calórico necessário é moderado e varia conforme o trimestre da gestação.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Tela de Atividades Não Indicadas - CORRIGIDA
  const RestrictedActivities = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      
      <LinearGradient
        colors={['#3B82F6', '#60A5FA']}
        style={styles.headerCorrected}
      >
        <View style={styles.headerContentCorrected}>
          <TouchableOpacity
            style={styles.backButtonCorrected}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backButtonTextCorrected}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.subHeaderInfoCorrected}>
            <View style={styles.iconContainerCorrected}>
              <Ionicons name="fitness" size={24} color="white" />
            </View>
            <Text style={styles.subHeaderTitleCorrected} numberOfLines={2}>
              Atividades não indicadas
            </Text>
          </View>
        </View>

        {/* Category Navigation */}
        <View style={styles.categoryNavCorrected}>
          <TouchableOpacity
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('MythsAndTruths')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Mitos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryNavItemCorrected}>
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Atividades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('FoodRestrictions')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Alimentação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('ContraindicatedMeds')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Medicamentos</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCorrected}
      >
        <View style={styles.sectionCorrected}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainerCorrected}>
            <View style={styles.searchBarCorrected}>
              <TextInput
                style={styles.searchInputCorrected}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButtonCorrected}>
            <Ionicons name="funnel" size={16} color="#3B82F6" />
            <Text style={styles.filterTextCorrected}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCardCorrected, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.contentTitleCorrected}>Atividades não indicadas</Text>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="bicycle" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Andar de bicicleta na rua</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Apesar de parecer uma atividade leve, o risco de queda aumenta com o crescimento da barriga. Bicicletas estacionárias são uma alternativa mais segura para o bebê.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="walk" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Praticar corrida intensa</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  O impacto repetitivo pode sobrecarregar as articulações e demais estruturas corporais. Caminhadas e natação são opções mais seguras.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="barbell" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Levantamento de peso excessivo</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Exercícios com cargas muito pesadas podem causar lesões e aumentar a pressão abdominal. Prefira pesos leves com supervisão profissional.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Tela de Restrições Alimentares - CORRIGIDA
  const FoodRestrictions = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EC4899" />
      
      <LinearGradient
        colors={['#EC4899', '#F472B6']}
        style={styles.headerCorrected}
      >
        <View style={styles.headerContentCorrected}>
          <TouchableOpacity 
            style={styles.backButtonCorrected}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backButtonTextCorrected}>Voltar</Text>
          </TouchableOpacity>
          
          <View style={styles.subHeaderInfoCorrected}>
            <View style={styles.iconContainerCorrected}>
              <Ionicons name="restaurant" size={24} color="white" />
            </View>
            <Text style={styles.subHeaderTitleCorrected} numberOfLines={2}>
              Restrições alimentares
            </Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNavCorrected}>
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('MythsAndTruths')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Mitos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('RestrictedActivities')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Atividades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryNavItemCorrected}>
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Alimentação</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('ContraindicatedMeds')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Medicamentos</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCorrected}
      >
        <View style={styles.sectionCorrected}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainerCorrected}>
            <View style={styles.searchBarCorrected}>
              <TextInput
                style={styles.searchInputCorrected}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButtonCorrected}>
            <Ionicons name="funnel" size={16} color="#EC4899" />
            <Text style={styles.filterTextCorrected}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCardCorrected, { backgroundColor: '#EC4899' }]}>
            <Text style={styles.contentTitleCorrected}>Comidas expressamente proibidas</Text>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="nutrition" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Carnes cruas ou mal cozidas</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Há um pequeno risco de contrair toxoplasmose ao consumir carne crua ou mal cozida, o que pode causar complicações espontâneas. Carnes de boca podem conter resíduos de chumbo, o que também representa um risco para a saúde do bebê.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="egg" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Ovos crus ou alimentos preparados com ovos crus</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Maionese caseira, mousse e molhos podem conter salmonela. Esta bactéria pode causar intoxicação alimentar e complicações graves.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="fish" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Peixes com alto teor de mercúrio</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Tubarão, cavala-rei e peixe-espada contêm altos níveis de mercúrio, que pode afetar o desenvolvimento do sistema nervoso do bebê.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Tela de Medicamentos Contraindicados - CORRIGIDA
  const ContraindicatedMeds = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7']}
        style={styles.headerCorrected}
      >
        <View style={styles.headerContentCorrected}>
          <TouchableOpacity 
            style={styles.backButtonCorrected}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backButtonTextCorrected}>Voltar</Text>
          </TouchableOpacity>
          
          <View style={styles.subHeaderInfoCorrected}>
            <View style={styles.iconContainerCorrected}>
              <Ionicons name="medical" size={24} color="white" />
            </View>
            <Text style={styles.subHeaderTitleCorrected} numberOfLines={2}>
              Medicamentos contraindicados
            </Text>
          </View>
        </View>
        
        {/* Category Navigation */}
        <View style={styles.categoryNavCorrected}>
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('MythsAndTruths')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Mitos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('RestrictedActivities')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="fitness" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Atividades</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryNavItemCorrected, { opacity: 0.7 }]}
            onPress={() => setCurrentScreen('FoodRestrictions')}
          >
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Alimentação</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryNavItemCorrected}>
            <View style={[styles.categoryNavIconCorrected, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text style={styles.categoryNavTextCorrected}>Medicamentos</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCorrected}
      >
        <View style={styles.sectionCorrected}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainerCorrected}>
            <View style={styles.searchBarCorrected}>
              <TextInput
                style={styles.searchInputCorrected}
                placeholder="Buscar palavras chave"
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.filterButtonCorrected}>
            <Ionicons name="funnel" size={16} color="#8B5CF6" />
            <Text style={styles.filterTextCorrected}>Filtrar</Text>
          </TouchableOpacity>
          
          {/* Content Section */}
          <View style={[styles.contentCardCorrected, { backgroundColor: '#8B5CF6' }]}>
            <Text style={styles.contentTitleCorrected}>Medicamentos contraindicados</Text>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="medical" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>O uso de Ibuprofeno</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Ele pode afetar o desenvolvimento do coração do bebê e reduzir o líquido amniótico. Paracetamol é geralmente considerado mais seguro.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="tablet-portrait" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Uso de Isotretinoína</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  O uso para tratamento de acne, mesmo em pequenas doses podem causar malformações fetais graves. Mulheres que usam este medicamento devem evitar engravidar.
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItemCorrected}>
              <View style={styles.activityIconContainerCorrected}>
                <Ionicons name="pill" size={28} color="white" />
              </View>
              <View style={styles.activityContentCorrected}>
                <Text style={styles.activityTitleCorrected}>Aspirina em altas doses</Text>
                <Text style={styles.activityDescriptionCorrected}>
                  Pode causar problemas de sangramento e afetar o fechamento de estruturas cardíacas do feto. Baixas doses podem ser prescritas em casos específicos.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Tela de Vacinação - CORRIGIDA
  const Vaccination = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <LinearGradient
        colors={['#8B5CF6', '#A855F7']}
        style={styles.headerCorrected}
      >
        <View style={styles.headerContentCorrected}>
          <TouchableOpacity 
            style={styles.backButtonCorrected}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backButtonTextCorrected}>Voltar</Text>
          </TouchableOpacity>
          
          <View style={styles.profileHeaderCorrected}>
            <View style={styles.profileIconContainerCorrected}>
              <Ionicons name="shield-checkmark" size={24} color="white" />
            </View>
            <View style={styles.profileTextContainerCorrected}>
              <Text style={styles.userIdCorrected}>123.456.789-09</Text>
              <Text style={styles.userNameHeaderCorrected} numberOfLines={1} ellipsizeMode="tail">
                Nome: {currentUser?.name || "Maria da Silva"}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainerCorrected}>
          <TouchableOpacity 
            style={styles.tabCorrected}
            onPress={() => setCurrentScreen('UserProfile')}
          >
            <Text style={styles.tabTextCorrected}>Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabCorrected, styles.activeTabCorrected]}>
            <Text style={styles.tabTextCorrected}>Vacinação</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCorrected}
      >
        {/* Barra de pesquisa */}
        <View style={styles.searchContainerCorrected}>
          <View style={styles.searchBarCorrected}>
            <TextInput
              style={styles.searchInputCorrected}
              placeholder="Buscar por palavra chave"
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>
        </View>
        
        <View style={styles.sectionCorrected}>
          {/* Hepatite B */}
          <View style={styles.vaccineCardCorrected}>
            <Text style={styles.vaccineTitleCorrected}>Hepatite B</Text>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose 1</Text>
              <View style={styles.statusCompletedCorrected}>
                <Text style={styles.statusTextCorrected}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose 2</Text>
              <View style={styles.statusCompletedCorrected}>
                <Text style={styles.statusTextCorrected}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose 3</Text>
              <View style={styles.statusPendingCorrected}>
                <Text style={styles.statusTextPendingCorrected}>Pendente</Text>
              </View>
            </View>
          </View>
          
          {/* dTpa adulto */}
          <View style={styles.vaccineCardCorrected}>
            <Text style={styles.vaccineTitleCorrected}>dTpa adulto (difteria e tétano) - dT</Text>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose Única</Text>
              <View style={styles.statusCompletedCorrected}>
                <Text style={styles.statusTextCorrected}>Concluída</Text>
              </View>
            </View>
          </View>
          
          {/* COVID-19 */}
          <View style={styles.vaccineCardCorrected}>
            <Text style={styles.vaccineTitleCorrected}>COVID-19</Text>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>1ª Dose</Text>
              <View style={styles.statusCompletedCorrected}>
                <Text style={styles.statusTextCorrected}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>2ª Dose</Text>
              <View style={styles.statusCompletedCorrected}>
                <Text style={styles.statusTextCorrected}>Concluída</Text>
              </View>
            </View>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose de Reforço</Text>
              <View style={styles.statusPendingCorrected}>
                <Text style={styles.statusTextPendingCorrected}>Pendente</Text>
              </View>
            </View>
          </View>
          
          {/* Influenza */}
          <View style={styles.vaccineCardCorrected}>
            <Text style={styles.vaccineTitleCorrected}>Influenza (Gripe)</Text>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose Anual</Text>
              <View style={styles.statusCompletedCorrected}>
                <Text style={styles.statusTextCorrected}>Concluída</Text>
              </View>
            </View>
          </View>
          
          {/* Tríplice Acelular */}
          <View style={styles.vaccineCardCorrected}>
            <Text style={styles.vaccineTitleCorrected}>Tríplice Acelular (dTpa)</Text>
            <View style={styles.doseRowCorrected}>
              <Text style={styles.doseTextCorrected}>Dose Gestacional</Text>
              <View style={styles.statusPendingCorrected}>
                <Text style={styles.statusTextPendingCorrected}>Pendente</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Função para renderizar a tela atual
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "HealthMain":
        return <HealthMain />;
      case "UserProfile":
        return <UserProfile />;
      case "MythsAndTruths":
        return <MythsAndTruths />;
      case "RestrictedActivities":
        return <RestrictedActivities />;
      case "FoodRestrictions":
        return <FoodRestrictions />;
      case "ContraindicatedMeds":
        return <ContraindicatedMeds />;
      case "Vaccination":
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
  
  // Botão de voltar CORRIGIDO
  backButtonCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    margin: 15,
    marginTop: 50,
    alignSelf: 'flex-start',
  },
  
  backButtonTextCorrected: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Header CORRIGIDO
  headerCorrected: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  
  headerContentCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  // CORREÇÃO: Header da tela principal com ícone separado
  headerInfoCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  // CORREÇÃO: Profile header específico para a tela Saúde
  profileHeaderCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  
  profileIconContainerCorrected: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  subHeaderInfoCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  
  profileTextContainerCorrected: {
    flex: 1,
    marginLeft: 12,
  },
  
  iconContainerCorrected: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // CORREÇÃO: Mais espaço entre ícone e texto
  },
  
  // CORREÇÃO: Texto maior na tela principal
  headerTitleCorrected: {
    color: 'white',
    fontSize: 28, // Aumentado de 24 para 28
    fontWeight: '700',
  },
  
  subHeaderTitleCorrected: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
    flex: 1,
  },
  
  subtitleCorrected: {
    color: 'white',
    fontSize: 16, // Aumentado de 14 para 16
    opacity: 0.9,
    marginBottom: 32,
    lineHeight: 22, // Aumentado de 20 para 22
    textAlign: 'center',
  },
  
  // User Card CORRIGIDO
  userCardCorrected: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  
  userCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  
  userIconContainerCorrected: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  userNameCorrected: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  userRoleCorrected: {
    color: 'white',
    fontSize: 13,
    opacity: 0.9,
  },
  
  userIdCorrected: {
    color: 'white',
    fontSize: 11,
    opacity: 0.8,
  },
  
  userNameHeaderCorrected: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Tabs CORRIGIDAS
  tabContainerCorrected: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 4,
    marginTop: 10,
  },
  
  tabCorrected: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  
  activeTabCorrected: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  
  tabTextCorrected: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Content
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -12,
  },
  
  scrollContentCorrected: {
    paddingBottom: 80,
  },
  
  // Search CORRIGIDO
  searchContainerCorrected: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  
  searchBarCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  
  searchInputCorrected: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    marginLeft: 8,
  },
  
  // Sections CORRIGIDAS
  sectionCorrected: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  sectionTitleCorrected: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  sectionMainTitleCorrected: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    lineHeight: 22,
  },
  
  // Condition Card CORRIGIDO
  conditionCardCorrected: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  conditionGradient: {
    padding: 16,
    borderRadius: 14,
  },
  
  conditionTitleCorrected: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  
  conditionSubtitleCorrected: {
    color: 'white',
    fontSize: 13,
    opacity: 0.9,
    marginBottom: 10,
  },
  
  conditionDescriptionCorrected: {
    color: 'white',
    fontSize: 13,
    opacity: 0.85,
    marginBottom: 14,
    lineHeight: 18,
  },
  
  conditionInfoCorrected: {
    color: 'white',
    fontSize: 11,
    marginBottom: 6,
    lineHeight: 16,
  },
  
  conditionLabelCorrected: {
    fontWeight: '600',
  },
  
  // Category Grid CORRIGIDO
  categoryGridCorrected: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  categoryCardCorrected: {
    width: '48%',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  categoryIconCorrected: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  categoryTextCorrected: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // Category Nav CORRIGIDO
  categoryNavCorrected: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 4,
    marginTop: 8,
  },
  
  categoryNavItemCorrected: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  
  categoryNavIconCorrected: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  
  categoryNavTextCorrected: {
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 11,
    fontWeight: '500',
  },
  
  // Filter button CORRIGIDO
  filterButtonCorrected: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginBottom: 12,
    marginLeft: 20,
  },
  
  filterTextCorrected: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Content Card CORRIGIDO
  contentCardCorrected: {
    borderRadius: 14,
    padding: 16,
    marginTop: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  contentTitleCorrected: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 20,
  },
  
  mythCardCorrected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  
  mythTitleCorrected: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
  },
  
  mythDescriptionCorrected: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 16,
  },
  
  // Activity items CORRIGIDOS
  activityItemCorrected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  activityIconContainerCorrected: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  
  activityContentCorrected: {
    flex: 1,
  },
  
  activityTitleCorrected: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
  },
  
  activityDescriptionCorrected: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 16,
  },
  
  // Vaccine cards CORRIGIDOS
  vaccineCardCorrected: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  
  vaccineTitleCorrected: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  
  doseRowCorrected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 2,
  },
  
  doseTextCorrected: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
  },
  
  statusCompletedCorrected: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  
  statusTextCorrected: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: '600',
  },
  
  statusPendingCorrected: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  
  statusTextPendingCorrected: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '600',
  },
});