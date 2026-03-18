import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaContadorAirballs({ navigation }) {
  const [airBalls, setAirBalls] = useState('0');

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

        <View style={estilos.conteudoCentral}>
          <View style={estilos.card}>
            
            <Text style={estilos.labelForte}>Quais áreas utilizadas:</Text>
            
            <Image 
              source={require('../../assets/areas_utilizadas.png')} 
              style={estilos.mapaCalor} 
            />

            <View style={estilos.linhaContador}>
              <Text style={estilos.labelForte}>Air-balls:</Text>
              <TextInput
                style={estilos.caixaNumero}
                value={airBalls}
                onChangeText={setAirBalls}
                keyboardType="numeric"
                placeholderTextColor="#666"
              />
            </View>

            <TouchableOpacity 
              style={estilos.botaoLargo}
              onPress={() => navigation.navigate('TelaResumoRelatorio')}
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
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 75,
  },
  card: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  labelForte: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15
  },
  mapaCalor: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 25,
    backgroundColor: '#f0f0f0',
  },
  linhaContador: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
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
  botaoLargo: {
    backgroundColor: '#700000',
    borderRadius: 10,
    paddingVertical: 12,
    width: '50%',
    alignSelf: 'center',
    marginTop: 10
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});