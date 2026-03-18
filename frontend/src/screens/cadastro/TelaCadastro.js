import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';

export default function TelaCadastro({ navigation }) {
  return (
    <GradientWrapper style={estilos.container}>
      
      <View style={estilos.logoContainer}>
        <Image source={require('../../assets/basquete.png')} style={estilos.logo} />
        <Text style={estilos.tituloApp}>Arremessando Alto</Text>
      </View>

      <View style={estilos.card}>
        
        <Text style={estilos.label}>Email:</Text>
        <TextInput 
          style={estilos.input} 
          placeholder="Escreva seu email"
          placeholderTextColor="#666"
        />

        <Text style={estilos.label}>Senha:</Text>
        <TextInput 
          style={estilos.input} 
          secureTextEntry 
          placeholder="Escreva sua senha"
          placeholderTextColor="#666"
        />

        <Text style={estilos.label}>Confirmar senha:</Text>
        <TextInput 
          style={estilos.input} 
          secureTextEntry 
          placeholder="Confirme sua senha"
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={estilos.link}>
          Já possui uma conta?{" "}
          <Text
            style={estilos.linkVermelho}
            onPress={() => navigation.navigate('TelaLogin')}
          >
            Entre
          </Text>
        </Text>

      </View>
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 120
  },

  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 35 
  },

  logo: { 
    width: 100, 
    height: 100, 
    resizeMode: 'contain' 
  },

  tituloApp: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 10
  },

  card: { 
    backgroundColor: '#E0E0E0', 
    borderRadius: 20, 
    padding: 25, 
    width: '85%', 
    alignItems: 'center' 
  },

  label: { 
    alignSelf: 'flex-start', 
    fontWeight: 'bold', 
    marginBottom: 5,
    color: '#000'
  },

  input: { 
    backgroundColor: '#CCCCCC', 
    width: '100%', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 15,
    color: '#000'
  },

  botao: { 
    backgroundColor: '#700000', 
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginTop: 10 
  },

  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },

  link: { 
    marginTop: 15, 
    fontSize: 12, 
    textAlign: 'center',
    color: '#000'
  },

  linkVermelho: {
    color: '#8B0000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});