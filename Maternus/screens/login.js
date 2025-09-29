import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function Login({ navigation }) {
  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [senha, setSenha] = useState('');

  const UserTeste = { 
    cpfOuCnpj: '12345678900',
    senha: '3301'
  };

  const verificarLogin = () => {
    if(cpfOuCnpj === UserTeste.cpfOuCnpj && senha === UserTeste.senha){
      navigation.replace('Main'); 
    } else {
      Alert.alert('Erro', 'Dados de Login incorretos, Tente novamente');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/logo_maternus.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      <View style={styles.container}>
        <Text style={styles.textoDeLogin}>Entre com a sua conta!</Text>

        <TextInput
          style={styles.input}
          placeholder="CPF ou CNPJ"
          keyboardType="numeric"
          placeholderTextColor="#aaa"
          value={cpfOuCnpj}
          onChangeText={setCpfOuCnpj}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.botaoEntrar} onPress={verificarLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoGoogle}>
          <AntDesign name="google" size={20} color="#000" />
          <Text style={styles.textoBotaoGoogle}>Entrar com o Google</Text>
        </TouchableOpacity>

        {/* CARD DE DADOS DE TESTE */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados de teste</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>CPF:</Text>
            <Text style={styles.cardValue}>{UserTeste.cpfOuCnpj}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Senha:</Text>
            <Text style={styles.cardValue}>{UserTeste.senha}</Text>
          </View>
        </View>

        <View style={styles.linkContainer}>
          <Text style={styles.subTextoLogin}>Ainda não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.hyperlinkLogin}> Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    backgroundColor: '#F2EFFF', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  containerLogo: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '80%' 
  },
  logo: { 
    width: '100%', 
    height: 250 
  },
  container: { 
    width: '80%', 
    alignItems: 'center', 
  },
  textoDeLogin: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  input: { 
    width: '100%', 
    backgroundColor: '#fff', 
    marginBottom: 15, 
    color: '#000', 
    fontSize: 16, 
    borderRadius: 15, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ccc' 
  },
  botaoEntrar: { 
    width: '100%', 
    backgroundColor: '#8A65FF', 
    borderRadius: 8, 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  textoBotao: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  botaoGoogle: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15, 
    backgroundColor: '#fff', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ccc' 
  },
  textoBotaoGoogle: { 
    marginLeft: 10, 
    fontSize: 15, 
    color: '#000' 
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
    color: '#8A65FF'
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  cardLabel: { 
    fontWeight: '600', 
    color: '#444' 
  },
  cardValue: { 
    fontWeight: '700', 
    color: '#8A65FF' 
  },
  linkContainer: { 
    marginTop: 20, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  subTextoLogin: { 
    fontSize: 14, 
    color: '#444' 
  },
  hyperlinkLogin: { 
    fontSize: 14, 
    color: '#8A65FF' 
  },
});
