import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

// Essa tela é reservada para a futura integração com o sensor embarcado.
// Por enquanto, o botão "Conectar" leva direto para o formulário de treino.
export default function TelaConectar({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>

      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Relatórios</Text>
        <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
      </View>

      <View style={estilos.conteudo}>
        <Text style={estilos.texto}>
          Conectar a um dispositivo{'\n'}de monitoramento
        </Text>

        <TouchableOpacity
          style={estilos.botao}
          onPress={() => navigation.navigate('TelaFormularioRelatorio')}
        >
          <Text style={estilos.textoBotao}>Conectar</Text>
        </TouchableOpacity>
      </View>

      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, paddingTop: 50 },
  conteudo: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80 },
  texto: { color: '#FFF', fontSize: 18, textAlign: 'center', marginBottom: 40 },
  botao: {
    backgroundColor: '#700000', borderRadius: 10,
    paddingVertical: 12, paddingHorizontal: 40, alignItems: 'center',
  },
  textoBotao: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});