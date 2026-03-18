import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaFormulario({ navigation }) {
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
          <View style={estilos.infoSection}>
            
            <Text style={estilos.labelNome}>Nome:</Text>
            <TextInput 
              style={estilos.input} 
              placeholder="Digite o nome do treino" 
              placeholderTextColor="#666"
            />

            <Text style={estilos.label}>Data:</Text>
            <TextInput 
              style={estilos.input} 
              placeholder="00/00/0000" 
              keyboardType="numeric" 
              placeholderTextColor="#666"
            />

            <Text style={estilos.label}>Descrição:</Text>
            <TextInput 
              style={estilos.inputDescricao}
              placeholder="Detalhes do treino..." 
              multiline={true}
              placeholderTextColor="#666"
            />

          </View>

          <TouchableOpacity 
            style={estilos.botao}
            onPress={() => navigation.navigate('TelaContadorArremessos')}
          >
            <Text style={estilos.textoBotao}>Começar</Text>
          </TouchableOpacity>
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
    paddingTop: 80,
    paddingBottom: 100
  },

  card: { 
    backgroundColor: '#FFF', 
    width: '90%', 
    borderRadius: 20, 
    padding: 20, 
    minHeight: 400, 
    justifyContent: 'space-between',
    elevation: 5
  },

  infoSection: { 
    width: '100%' 
  },

  labelNome: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000',
    marginTop: 0
  },

  label: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000', 
    marginTop: 15 
  },

  input: { 
    backgroundColor: '#D9D9D9', 
    borderRadius: 5, 
    padding: 10, 
    marginTop: 5, 
    fontSize: 16,
    color: '#000'
  },

  inputDescricao: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
    height: 80,
    color: '#000',
    textAlignVertical: 'top'
  },

  botao: { 
    backgroundColor: '#700000', 
    borderRadius: 10, 
    paddingVertical: 12, 
    paddingHorizontal: 40, 
    alignSelf: 'center', 
    marginTop: 30,
    marginBottom: 7 
  },

  textoBotao: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});