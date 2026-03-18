import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaResumoRelatorio({ navigation }) {
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
            
            {/* Campos de Identificação */}
            <Text style={estilos.labelInput}>Nome:</Text>
            <TextInput 
              style={estilos.inputCinza} 
              placeholder="Primeiro treino" 
              placeholderTextColor="#666" 
            />

            <Text style={estilos.labelInput}>Data:</Text>
            <TextInput 
              style={estilos.inputCinza} 
              placeholder="23/01/2026" 
              keyboardType="numeric"
              placeholderTextColor="#666" 
            />

            <Text style={estilos.labelInput}>Descrição:</Text>
            <TextInput 
              style={estilos.inputCinza} 
              placeholder="Treino de arremessos de meia distância" 
              placeholderTextColor="#666" 
            />

            {/* Linhas de Estatísticas Editáveis */}
            <View style={estilos.linhaEstatistica}>
              <Text style={estilos.labelEstatistica}>Arremessos:</Text>
              <TextInput style={estilos.valorQuadrado} keyboardType="numeric" defaultValue="4" />
            </View>

            <View style={estilos.linhaEstatistica}>
              <Text style={estilos.labelEstatistica}>Acertos:</Text>
              <TextInput style={estilos.valorQuadrado} keyboardType="numeric" defaultValue="2" />
            </View>

            <View style={estilos.linhaEstatistica}>
              <Text style={estilos.labelEstatistica}>Erros:</Text>
              <TextInput style={estilos.valorQuadrado} keyboardType="numeric" defaultValue="2" />
            </View>

            <View style={estilos.linhaEstatistica}>
              <Text style={estilos.labelEstatistica}>Aproveitamento:</Text>
              <TextInput style={estilos.valorQuadrado} defaultValue="50%" />
            </View>

            {/* Botões Lado a Lado */}
            <View style={estilos.rowBotoes}>
              <TouchableOpacity 
                style={estilos.botaoAcao}
                onPress={() => navigation.navigate('TelaRelatorioPrincipalComCard')}
              >
                <Text style={estilos.textoBotao}>Salvar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={estilos.botaoAcao}
                onPress={() => {/* Função de compartilhar */}}
              >
                <Text style={estilos.textoBotao}>Compartilhar</Text>
              </TouchableOpacity>
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
  conteudoCentral: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  labelInput: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 5,
    color: '#000'
  },
  inputCinza: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    color: '#000'
  },
  linhaEstatistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  labelEstatistica: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#000'
  },
  valorQuadrado: {
    backgroundColor: '#D9D9D9',
    width: 60,
    height: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 3,
    color: '#000',
    padding: 0,
    fontSize: 16
  },
  rowBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  botaoAcao: {
    backgroundColor: '#700000',
    borderRadius: 8,
    paddingVertical: 12,
    width: '48%'
  },
  textoBotao: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  }
});