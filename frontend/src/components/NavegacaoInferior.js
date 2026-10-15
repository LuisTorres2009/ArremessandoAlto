import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CORES from '../styles/cores';
import { trocarTela } from '../config/trocarTela';
export default function NavegacaoInferior() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Pega o nome da tela atual para destacar o botão correto
  const telaAtual = useNavigationState((state) => state.routes[state.index].name);

  const telasTreino = ['TelaSemanas', 'TelaTreino'];
  const telasRelatorio = ['TelaHistoricoTreinos', 'TelaConfigurarTreino', 'TelaTreinoAtivo', 'TelaDetalhesTreino', 'TelaEstatisticas'];
  const telasPerfil = ['TelaPerfil', 'TelaPerfilEdicao'];

  const ativo = (telas) => telas.includes(telaAtual);

  // Ordem das abas, da esquerda para a direita
  const abas = [
    { nome: 'TelaSemanas', telas: telasTreino },
    { nome: 'TelaHistoricoTreinos', telas: telasRelatorio },
    { nome: 'TelaPerfil', telas: telasPerfil },
  ];

  // Aba à esquerda da atual: a tela entra pela esquerda; à direita: entra pela direita.
  const irPara = (nome) => {
    if (telaAtual === nome) return;
    const posAtual = abas.findIndex((a) => a.telas.includes(telaAtual));
    const posDestino = abas.findIndex((a) => a.nome === nome);
    trocarTela(navigation, nome, undefined, posDestino < posAtual ? 'esquerda' : 'direita');
  };

  return (
    <View style={[estilos.areaNavegacao, { paddingBottom: insets.bottom + 10 }]}>

      <TouchableOpacity
        style={estilos.itemNavegacao}
        onPress={() => irPara('TelaSemanas')}
      >
        <View style={[estilos.indicador, ativo(telasTreino) && estilos.indicadorAtivo]} />
        <Image
          source={require('../assets/treino.png')}
          style={[estilos.icone, ativo(telasTreino) && estilos.iconeAtivo]}
        />
        <Text style={[estilos.textoItem, ativo(telasTreino) && estilos.textoAtivo]}>
          Treino
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.itemNavegacao}
        onPress={() => irPara('TelaHistoricoTreinos')}
      >
        <View style={[estilos.indicador, ativo(telasRelatorio) && estilos.indicadorAtivo]} />
        <Image
          source={require('../assets/relatorio.png')}
          style={[estilos.icone, ativo(telasRelatorio) && estilos.iconeAtivo]}
        />
        <Text style={[estilos.textoItem, ativo(telasRelatorio) && estilos.textoAtivo]}>
          Relatório
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.itemNavegacao}
        onPress={() => irPara('TelaPerfil')}
      >
        <View style={[estilos.indicador, ativo(telasPerfil) && estilos.indicadorAtivo]} />
        <Image
          source={require('../assets/perfil.png')}
          style={[estilos.icone, ativo(telasPerfil) && estilos.iconeAtivo]}
        />
        <Text style={[estilos.textoItem, ativo(telasPerfil) && estilos.textoAtivo]}>
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const estilos = StyleSheet.create({
  areaNavegacao: {
    flexDirection: 'row',
    backgroundColor: CORES.primariaNavegacao,
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  itemNavegacao: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  indicador: {
    height: 3,
    width: 24,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginBottom: 4,
  },
  indicadorAtivo: {
    backgroundColor: CORES.branco,
  },
  icone: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  iconeAtivo: {
    opacity: 1,
  },
  textoItem: {
    color: CORES.branco,
    fontWeight: 'bold',
    fontSize: 13,
    opacity: 0.5,
  },
  textoAtivo: {
    opacity: 1,
  },
});