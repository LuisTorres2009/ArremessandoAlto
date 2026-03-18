import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaDetalhesCard({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>
      
      {/* Cabeçalho Padronizado */}
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Relatórios</Text>
        <Image 
          source={require('../../assets/basquete.png')} 
          style={estilosGlobais.icone} 
        />
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.card}>
          
          {/* Título e Data do Treino */}
          <Text style={estilos.treinoTitulo}>Primeiro Treino</Text>
          <Text style={estilos.dataTexto}>23/01/2026</Text>

          {/* Estatísticas de Leitura */}
          <View style={estilos.statsContainer}>
            <Text style={estilos.label}>Quantidade de arremessos: <Text style={estilos.valor}>4</Text></Text>
            <Text style={estilos.label}>Acertos: <Text style={estilos.valor}>2</Text></Text>
            <Text style={estilos.label}>Erros: <Text style={estilos.valor}>2</Text></Text>
            <Text style={estilos.label}>Tempo: <Text style={estilos.valor}>0:30</Text></Text>
            <Text style={estilos.label}>Aproveitamento: <Text style={estilos.valor}>50%</Text></Text>
            
            <View style={estilos.descricaoBox}>
              <Text style={estilos.label}>Descrição:</Text>
              <Text style={estilos.valorNormal}>Treino de arremessos de meia distância focado em mecânica e saída rápida.</Text>
            </View>
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
    paddingTop: 50 
  },

  scrollContent: { 
    alignItems: 'center', 
    paddingTop: 10,
    paddingBottom: 100 
  },

  card: { 
    backgroundColor: '#FFF', 
    width: '90%', 
    borderRadius: 20, 
    padding: 25, 
    minHeight: 450,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  treinoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5
  },

  dataTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 30
  },

  statsContainer: {
    width: '100%',
  },

  label: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#000',
    lineHeight: 30,
  },

  valor: {
    fontWeight: 'bold',
    color: '#700000',
  },

  descricaoBox: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },

  valorNormal: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginTop: 5,
    lineHeight: 22
  }
});