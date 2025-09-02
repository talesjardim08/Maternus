import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, {useState} from 'react';

export default function Login({navigation}) {
    const [cpfOuCnpj, setCpfOuCnpj] = useState('');
    const [senha, setSenha] = useState('');

    const UserTeste = { //Login local de teste para TESTE do front end
        cpfOuCnpj: '12345678900',
        senha: 'TAMASOJO3301'
    };

    const verificarLogin = () =>{
        if(cpfOuCnpj === UserTeste.cpfOuCnpj && senha === UserTeste.senha){
            navigation.navigate('Home')
        }else{
            Alert.alert('Erro', 'Dados de Login incorretos, Tente novamente');
        }
    }

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
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  logo: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    width: '80%',
    alignItems: 'center',
  },
  textoDeLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    borderColor: '#ccc',
    borderEndColor: '#fff'
  },
  botaoEntrar: {
    width: '100%',
    backgroundColor: '#8A65FF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    borderColor: '#ccc',
  },
  textoBotaoGoogle: {
    marginLeft: 10,
    fontSize: 15,
    color: '#000',
  },
  linkContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTextoLogin: {
    fontSize: 14,
    color: '#444',
  },
  hyperlinkLogin: {
    fontSize: 14,
    color: '#8A65FF',
  },
});
