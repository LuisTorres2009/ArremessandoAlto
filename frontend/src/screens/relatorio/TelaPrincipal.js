import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaPrincipal({ navigation }) {
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

      {/* CONTEÚDO CENTRAL */}
      <View style={estilos.conteudo}>
        {/* Espaço para lista de relatórios ou mensagens */}
      </View>

      {/* Botão Flutuante (FAB) para novo relatório */}
      <TouchableOpacity 
        style={estilos.fab}             
        onPress={() => navigation.navigate('TelaFormularioRelatorio')}
      >
        <MaterialIcons name="add" size={35} color="#FFF" />
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

  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 110, 
    backgroundColor: '#700000',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});