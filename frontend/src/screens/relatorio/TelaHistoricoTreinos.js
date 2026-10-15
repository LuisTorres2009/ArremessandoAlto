import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import api from '../../config/api';
import { nomeDaPosicao } from '../../config/posicoes';
import CORES from '../../styles/cores';

export default function TelaHistoricoTreinos({ navigation, route }) {
  const [nivelSubiu, setNivelSubiu] = useState(route?.params?.nivelSubiu || null);
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  // O spinner só aparece na 1ª carga; ao voltar para a tela, atualiza em silêncio.
  async function carregarHistorico() {
    try {
      const resposta = await api.get('/aproveitamento/historico');
      setRegistros(resposta.data);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os relatórios.');
    } finally {
      setCarregando(false);
    }
  }

  function formatarData(dataStr) {
    if (!dataStr) return '—';
    const d = new Date(dataStr);
    if (isNaN(d)) return '—';
    return d.toLocaleDateString('pt-BR');
  }

  function corAproveitamento(valor) {
    if (valor >= 60) return CORES.sucesso;
    if (valor >= 40) return CORES.aviso;
    return CORES.erro;
  }

  return (
    <GradientWrapper style={estilos.tela}>

      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Relatórios</Text>
        <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color={CORES.branco} style={estilos.loading} />
      ) : (
        <ScrollView style={estilos.conteudo} contentContainerStyle={estilos.scrollContainer}>
          {!!nivelSubiu && (
            <View style={estilos.bannerNivel}>
              <Text style={estilos.textoBannerNivel}>🏆 Parabéns! Você subiu para o nível {nivelSubiu}!</Text>
              <TouchableOpacity onPress={() => setNivelSubiu(null)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <MaterialIcons name="close" size={20} color={CORES.textoMedio} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={estilos.botaoEstatisticas}
            onPress={() => navigation.navigate('TelaEstatisticas')}
          >
            <MaterialIcons name="bar-chart" size={22} color={CORES.primaria} />
            <Text style={estilos.textoBotaoEstatisticas}>Ver estatísticas</Text>
          </TouchableOpacity>

          {registros.length === 0 ? (
            <View style={estilos.vazioContainer}>
              <Text style={estilos.textoVazio}>Nenhum treino registrado ainda.</Text>
              <Text style={estilos.textoVazioSub}>Toque no + para começar!</Text>
            </View>
          ) : (
            registros.map((item) => (
              <TouchableOpacity
                key={item.id_reg_aprov}
                style={estilos.cardRelatorio}
                onPress={() => navigation.navigate('TelaDetalhesTreino', { registro: item })}
              >
                <View style={estilos.cardHeader}>
                  <View style={estilos.cardTextos}>
                    <Text style={estilos.textoCardPrincipal}>
                      {item.titulo || (item.numero_aula
                        ? `Semana ${item.semana} — Aula ${item.numero_aula}`
                        : 'Treino livre')}
                    </Text>
                    <Text style={estilos.textoCardSecundario}>
                      {formatarData(item.data_registro)}
                    </Text>
                  </View>
                  <View style={[estilos.badge, { backgroundColor: corAproveitamento(item.aproveitamento) }]}>
                    <Text style={estilos.textoBadge}>{item.aproveitamento}%</Text>
                  </View>
                </View>

                <View style={estilos.cardStats}>
                  <Text style={estilos.statTexto}>🏀 {item.tentativas} arremessos</Text>
                  <Text style={estilos.statTexto}>✓ {item.acertos} acertos</Text>
                  {!!item.tempo && <Text style={estilos.statTexto}>⏱ {item.tempo}</Text>}
                  {!!item.posicao && <Text style={estilos.statTexto}>📍 {nomeDaPosicao(item.posicao)}</Text>}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={estilos.fab}
        onPress={() => navigation.navigate('TelaConfigurarTreino')}
      >
        <MaterialIcons name="add" size={35} color={CORES.branco} />
      </TouchableOpacity>

      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, paddingTop: 50 },
  // flex: 1 faz o spinner ocupar todo o espaço livre da tela,
  // mantendo a barra de navegação sempre no rodapé durante o carregamento
  loading: { flex: 1 },
  conteudo: { flex: 1 },
  scrollContainer: { alignItems: 'center', paddingBottom: 160, paddingTop: 10 },
  bannerNivel: {
    backgroundColor: CORES.sucessoFundo, borderLeftWidth: 4, borderLeftColor: CORES.sucesso,
    width: '90%', borderRadius: 15, padding: 14, marginBottom: 8,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  textoBannerNivel: { flex: 1, color: CORES.textoEscuro, fontWeight: 'bold', fontSize: 15, marginRight: 10 },
  botaoEstatisticas: {
    backgroundColor: CORES.branco, width: '90%', borderRadius: 15, padding: 14, marginBottom: 8,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4,
  },
  textoBotaoEstatisticas: { color: CORES.primaria, fontWeight: 'bold', fontSize: 16 },
  vazioContainer: { marginTop: 80, alignItems: 'center' },
  textoVazio: { color: CORES.branco, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  textoVazioSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 },
  cardRelatorio: {
    backgroundColor: CORES.branco, width: '90%', borderRadius: 15,
    padding: 20, marginVertical: 8, elevation: 4,
    shadowColor: CORES.textoEscuro, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTextos: { flex: 1 },
  textoCardPrincipal: { fontSize: 16, fontWeight: 'bold', color: CORES.textoEscuro },
  textoCardSecundario: { fontSize: 13, color: CORES.textoClaro, marginTop: 2 },
  badge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginLeft: 10 },
  textoBadge: { color: CORES.branco, fontWeight: 'bold', fontSize: 15 },
  cardStats: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  statTexto: { fontSize: 13, color: CORES.textoDesabilitado },
  fab: {
    position: 'absolute', width: 60, height: 60,
    alignItems: 'center', justifyContent: 'center',
    right: 30, bottom: 170, backgroundColor: CORES.primaria,
    borderRadius: 30, elevation: 8,
  },
});