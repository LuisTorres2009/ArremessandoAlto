import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import api from '../../config/api';
import { trocarTela } from '../../config/trocarTela';
import { nomeDaPosicao } from '../../config/posicoes';
import CORES from '../../styles/cores';

function corAproveitamento(valor) {
  if (valor >= 60) return CORES.sucesso;
  if (valor >= 40) return CORES.aviso;
  return CORES.erro;
}

// 330 -> "5:30"
function formatarDuracao(segundos) {
  if (segundos === null || segundos === undefined) return '—';
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatarPorcentagem(valor) {
  if (valor === null || valor === undefined) return '—';
  return `${String(valor).replace('.', ',')}%`;
}

// Como mostrar cada meta do próximo nível (as chaves vêm do backend, utils/nivel.js)
const CRITERIOS = {
  aproveitamento: { rotulo: 'Aproveitamento', formatar: (v) => `${String(v).replace('.', ',')}%` },
  arremessos: { rotulo: 'Arremessos', formatar: (v) => String(v) },
  minutos: { rotulo: 'Tempo de treino', formatar: (v) => `${v} min` },
};

function formatarPorMinuto(valor) {
  if (valor === null || valor === undefined) return '—';
  return String(valor).replace('.', ',');
}

export default function TelaEstatisticas({ navigation }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  // O spinner só aparece na 1ª carga; ao voltar para a tela, atualiza em silêncio.
  async function carregar() {
    try {
      const resposta = await api.get('/aproveitamento/estatisticas');
      setDados(resposta.data);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar as estatísticas.');
    } finally {
      setCarregando(false);
    }
  }

  const semTreinos = !dados || dados.geral.treinos === 0;

  return (
    <GradientWrapper style={estilos.tela}>

      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Estatísticas</Text>
        <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color={CORES.branco} style={estilos.loading} />
      ) : (
        <ScrollView contentContainerStyle={estilos.scrollContent}>

          <TouchableOpacity onPress={() => trocarTela(navigation, 'TelaHistoricoTreinos', undefined, 'esquerda')} style={estilos.btnVoltar}>
            <Text style={estilos.txtVoltar}>← Voltar</Text>
          </TouchableOpacity>

          {semTreinos ? (
            <View style={estilos.card}>
              <Text style={estilos.vazioTitulo}>Nenhum treino registrado ainda.</Text>
              <Text style={estilos.vazioSub}>
                Faça um treino para ver suas estatísticas por aqui.
              </Text>
            </View>
          ) : (
            <>
              {/* Nível de experiência e quanto falta para o próximo */}
              {!!dados.nivel && (
                <View style={estilos.card}>
                  <Text style={estilos.cardTitulo}>Seu nível</Text>
                  <View style={estilos.badgeNivel}>
                    <Text style={estilos.badgeNivelTexto}>{dados.nivel.nome || 'Não definido'}</Text>
                  </View>

                  {dados.nivel.proximo ? (
                    <>
                      <Text style={estilos.nivelExplicacao}>
                        Para chegar a {dados.nivel.proximo.nome}, atinja as 3 metas:
                      </Text>
                      {dados.nivel.proximo.criterios.map((c, i) => {
                        const info = CRITERIOS[c.chave];
                        const ultimo = i === dados.nivel.proximo.criterios.length - 1;
                        return (
                          <View key={c.chave} style={[estilos.criterio, ultimo && estilos.ultimaLinha]}>
                            <View style={estilos.posicaoTopo}>
                              <Text style={estilos.label}>{c.concluido ? '✓ ' : ''}{info.rotulo}</Text>
                              <Text style={[estilos.valor, c.concluido && estilos.valorOk]}>
                                {info.formatar(c.atual)} / {info.formatar(c.meta)}
                              </Text>
                            </View>
                            <View style={estilos.barraFundo}>
                              <View
                                style={[
                                  estilos.barraPreenchida,
                                  { width: `${c.progresso}%`, backgroundColor: c.concluido ? CORES.sucesso : CORES.primaria },
                                ]}
                              />
                            </View>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <Text style={estilos.nivelExplicacao}>Você chegou ao nível máximo! 🏆</Text>
                  )}
                </View>
              )}

              {/* Aproveitamento geral */}
              <View style={estilos.card}>
                <Text style={estilos.cardTitulo}>Aproveitamento total</Text>
                <View style={[estilos.badgeGrande, { backgroundColor: corAproveitamento(dados.geral.aproveitamento) }]}>
                  <Text style={estilos.badgeTexto}>{formatarPorcentagem(dados.geral.aproveitamento)}</Text>
                  <Text style={estilos.badgeSubtexto}>de acertos</Text>
                </View>
                <View style={estilos.linha}>
                  <Text style={estilos.label}>Arremessos</Text>
                  <Text style={estilos.valor}>{dados.geral.tentativas}</Text>
                </View>
                <View style={estilos.linha}>
                  <Text style={estilos.label}>Acertos</Text>
                  <Text style={estilos.valor}>{dados.geral.acertos}</Text>
                </View>
                <View style={[estilos.linha, estilos.ultimaLinha]}>
                  <Text style={estilos.label}>Treinos</Text>
                  <Text style={estilos.valor}>{dados.geral.treinos}</Text>
                </View>
              </View>

              {/* Por posição */}
              <View style={estilos.card}>
                <Text style={estilos.cardTitulo}>Acertos por posição</Text>
                {dados.porPosicao.map((p, i) => {
                  const temDados = p.tentativas > 0;
                  const ultima = i === dados.porPosicao.length - 1;
                  return (
                    <View key={p.posicao} style={[estilos.posicaoItem, ultima && estilos.ultimaLinha]}>
                      <View style={estilos.posicaoTopo}>
                        <Text style={estilos.label}>{nomeDaPosicao(p.posicao)}</Text>
                        <Text style={[estilos.valor, !temDados && estilos.valorVazio]}>
                          {formatarPorcentagem(p.aproveitamento)}
                        </Text>
                      </View>
                      <View style={estilos.barraFundo}>
                        {temDados && (
                          <View
                            style={[
                              estilos.barraPreenchida,
                              { width: `${p.aproveitamento}%`, backgroundColor: corAproveitamento(p.aproveitamento) },
                            ]}
                          />
                        )}
                      </View>
                      <Text style={estilos.posicaoDetalhe}>
                        {temDados
                          ? `${p.acertos} acertos de ${p.tentativas} arremessos`
                          : 'Sem treinos nesta posição'}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Ritmo */}
              <View style={estilos.card}>
                <Text style={estilos.cardTitulo}>Ritmo de treino</Text>
                <View style={estilos.linha}>
                  <Text style={estilos.label}>Tempo médio de treino</Text>
                  <Text style={estilos.valor}>{formatarDuracao(dados.mediaTempoSegundos)}</Text>
                </View>
                <View style={estilos.linha}>
                  <Text style={estilos.label}>Arremessos por minuto</Text>
                  <Text style={estilos.valor}>{formatarPorMinuto(dados.arremessosPorMinuto)}</Text>
                </View>
                <View style={[estilos.linha, estilos.ultimaLinha]}>
                  <Text style={estilos.label}>Acertos por minuto</Text>
                  <Text style={estilos.valor}>{formatarPorMinuto(dados.acertosPorMinuto)}</Text>
                </View>
              </View>
            </>
          )}

        </ScrollView>
      )}

      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, paddingTop: 50 },
  // flex: 1 faz o spinner ocupar todo o espaço livre da tela,
  // mantendo a barra de navegação sempre no rodapé durante o carregamento
  loading: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingTop: 10, paddingBottom: 100 },
  btnVoltar: { alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 8, marginBottom: 6 },
  txtVoltar: { color: CORES.branco, fontSize: 15, fontWeight: 'bold' },
  card: {
    backgroundColor: CORES.branco, width: '90%', borderRadius: 20,
    padding: 22, marginBottom: 16, elevation: 5,
  },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: CORES.textoEscuro, marginBottom: 16 },
  badgeGrande: { borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginBottom: 18 },
  badgeTexto: { color: CORES.branco, fontSize: 36, fontWeight: 'bold' },
  badgeSubtexto: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  linha: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingBottom: 12, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#EEE',
  },
  ultimaLinha: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
  label: { fontSize: 16, fontWeight: 'bold', color: CORES.textoEscuro, flexShrink: 1, paddingRight: 10 },
  valor: { fontSize: 16, fontWeight: 'bold', color: CORES.primaria },
  valorVazio: { color: CORES.cinzaMedio },
  valorOk: { color: CORES.sucesso },
  badgeNivel: { backgroundColor: CORES.primaria, borderRadius: 16, paddingVertical: 12, alignItems: 'center', marginBottom: 14 },
  badgeNivelTexto: { color: CORES.branco, fontSize: 24, fontWeight: 'bold' },
  nivelExplicacao: { fontSize: 14, color: CORES.textoClaro, marginBottom: 14, textAlign: 'center' },
  criterio: { paddingBottom: 14, marginBottom: 14, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  posicaoItem: { paddingBottom: 14, marginBottom: 14, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  posicaoTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  barraFundo: { height: 8, borderRadius: 4, backgroundColor: '#EEE', overflow: 'hidden' },
  barraPreenchida: { height: 8, borderRadius: 4 },
  posicaoDetalhe: { fontSize: 13, color: CORES.textoClaro, marginTop: 6 },
  vazioTitulo: { fontSize: 17, fontWeight: 'bold', color: CORES.textoEscuro, textAlign: 'center' },
  vazioSub: { fontSize: 14, color: CORES.textoClaro, textAlign: 'center', marginTop: 8 },
});