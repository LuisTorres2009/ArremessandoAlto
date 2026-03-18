import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaContadorArremessos({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Cabeçalho Padronizado */}
        <View style={estilosGlobais.cabecalho}>
          <Text style={estilosGlobais.titulo}>Relatórios</Text>
          <Image 
            source={require('../../assets/basquete.png')} 
            style={estilosGlobais.icone} 
          />
        </View>

        {/* Conteúdo Centralizado */}
        <View style={estilos.conteudoCentral}>
          <View style={estilos.card}>
            
            {/* Campo Arremessos */}
            <View style={estilos.linhaContador}>
              <Text style={estilos.labelContador}>Arremessos:</Text>
              <TextInput
                style={estilos.caixaNumero}
                keyboardType="numeric"
                defaultValue="0"
                placeholderTextColor="#666"
              />
            </View>

            {/* Campo Acertos */}
            <View style={estilos.linhaContador}>
              <Text style={estilos.labelContador}>Acertos:</Text>
              <TextInput
                style={estilos.caixaNumero}
                keyboardType="numeric"
                defaultValue="0"
                placeholderTextColor="#666"
              />
            </View>

            {/* Campo Erros */}
            <View style={estilos.linhaContador}>
              <Text style={estilos.labelContador}>Erros:</Text>
              <TextInput
                style={estilos.caixaNumero}
                keyboardType="numeric"
                defaultValue="0"
                placeholderTextColor="#666"
              />
            </View>

            {/* Botão Finalizar */}
            <TouchableOpacity 
              style={estilos.botaoFinalizar}
              onPress={() => navigation.navigate('TelaContadorAirballs')}
            >
              <Text style={estilos.textoBotao}>Finalizar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>

      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 50,
  },
  conteudoCentral: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 115,
  },
  card: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 30,
    minHeight: 380,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  linhaContador: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  labelContador: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  caixaNumero: {
    backgroundColor: '#D9D9D9',
    width: 65,
    height: 55,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  botaoFinalizar: {
    backgroundColor: '#700000',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: '50%' 
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});