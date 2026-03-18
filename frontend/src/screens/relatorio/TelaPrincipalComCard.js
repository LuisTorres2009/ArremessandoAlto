import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaPrincipalComCard({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>

      {/* HEADER PADRONIZADO */}
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Relatórios</Text>
        <Image
          source={require('../../assets/basquete.png')}
          style={estilosGlobais.icone}
        />
      </View>

      {/* LISTAGEM DE CARDS */}
      <ScrollView style={estilos.conteudo} contentContainerStyle={estilos.scrollContainer}>
        
        {/* CARD DE TREINO SALVO */}
        <TouchableOpacity 
          style={estilos.cardRelatorio} 
          onPress={() => navigation.navigate('TelaDetalhesCard')}
        >
          <Text style={estilos.textoCardPrincipal}>Primeiro Treino</Text>
          <Text style={estilos.textoCardSecundario}>23/01/2026</Text>
        </TouchableOpacity>

        {/* Você pode replicar o TouchableOpacity acima para mais treinos */}

      </ScrollView>

      {/* BOTÃO FLUTUANTE (FAB) */}
      <TouchableOpacity 
        style={estilos.fab}
        onPress={() => navigation.navigate('TelaFormularioRelatorio')}
      >
        <MaterialIcons name="add" size={40} color="#FFF" />
      </TouchableOpacity>

      {/* BARRA INFERIOR */}
      <NavegacaoInferior />

    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 50,
  },
  conteudo: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  cardRelatorio: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textoCardPrincipal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textoCardSecundario: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 110, 
    backgroundColor: '#700000',
    borderRadius: 35,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});