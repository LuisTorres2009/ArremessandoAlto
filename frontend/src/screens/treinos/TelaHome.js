import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

const semanas = Array.from({ length: 8 }, (_, indice) => ({
  id: indice + 1,
  titulo: `Semana ${indice + 1}`,
  totalExercicios: 7,
}));

export default function TelaHome({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>
      
      {/* Cabeçalho usando os estilos globais que você definiu */}
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Home</Text>
        <Image 
          source={require('../../assets/basquete.png')} 
          style={estilosGlobais.icone} 
        />
      </View>

      <ScrollView style={estilos.listaSemanas}>
        {semanas.map((semana) => (
          <TouchableOpacity
            key={semana.id}
            style={estilos.caixaSemana}
            onPress={() => navigation.navigate('TelaTreino', { week: semana.id })}
          >
            <Text style={estilos.tituloSemana}>{semana.titulo}</Text>
            <Text style={estilos.subtituloSemana}>{semana.totalExercicios} exercícios</Text>
          </TouchableOpacity>
        ))}
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
  listaSemanas: {
    flex: 1,
    paddingHorizontal: 20,
  },
  caixaSemana: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
  },
  tituloSemana: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtituloSemana: {
    fontSize: 14,
    color: '#555',
  },
});