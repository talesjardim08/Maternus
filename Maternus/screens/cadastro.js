import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, TextInput } from 'react-native';

export default function Cadastro({navigation}) {
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/logo_maternus.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      <View style={styles.container}>
        <Text style={styles.tituloCadastro}>Cadastre-se</Text>
        <View style={styles.linkContainer}>
          <Text style={styles.subTexto}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.hyperlink}> Clique aqui</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="CPF ou CNPJ"
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.subInfo}>
          * Isso irá nos ajudar a selecionar a versão do aplicativo que melhor atende a sua necessidade.
        </Text>

        {/* Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha (Mínimo 8 dígitos)"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />

        {/* Botão Criar */}
        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>
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
   tituloCadastro: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  linkContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  subTexto: {
    fontSize: 14,
    color: '#555',
  },
  hyperlink: {
    fontSize: 14,
    color: '#8A65FF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    color: '#000',
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  subInfo: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
  },
  botaoCriar: {
    width: '100%',
    backgroundColor: '#8A65FF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
