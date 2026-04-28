import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  TextInput, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import api from '../../config/api';

// Esta tela unifica 3 telas antigas em um único fluxo de 2 etapas:
// Etapa 1 — Identificação do treino (nome, data, descrição) + contagem de arremessos
// Etapa 2 — Confirmação e envio para a API

export default function TelaFormularioRelatorio({ navigation }) {
  const [etapa, setEtapa] = useState(1);

  // Etapa 1
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tentativas, setTentativas] = useState('0');
  const [acertos, setAcertos] = useState('0');

  const [carregando, setCarregando] = useState(false);

  // Máscara de data DD/MM/AAAA
  function mascaraData(texto) {
    const n = texto.replace(/\D/g, '');
    if (n.length <= 2) return n;
    if (n.length <= 4) return `${n.slice(0,2)}/${n.slice(2)}`;
    return `${n.slice(0,2)}/${n.slice(2,4)}/${n.slice(4,8)}`;
  }

  // Garante que acertos nunca seja maior que tentativas
  function handleAcertos(valor) {
    const n = parseInt(valor) || 0;
    const t = parseInt(tentativas) || 0;
    if (n > t) {
      Alert.alert('Atenção', 'Acertos não pode ser maior que tentativas.');
      return;
    }
    setAcertos(String(n));
  }

  function handleTentativas(valor) {
    setTentativas(valor);
    // Revalida acertos
    const t = parseInt(valor) || 0;
    const a = parseInt(acertos) || 0;
    if (a > t) setAcertos(String(t));
  }

  function avancarEtapa() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe um nome para o treino.');
      return;
    }
    const t = parseInt(tentativas) || 0;
    if (t === 0) {
      Alert.alert('Atenção', 'Informe pelo menos 1 arremesso.');
      return;
    }
    setEtapa(2);
  }

  // Calcula tudo na hora de confirmar
  const tentativasNum = parseInt(tentativas) || 0;
  const acertosNum = parseInt(acertos) || 0;
  const erros = tentativasNum - acertosNum;
  const aproveitamento = tentativasNum > 0
    ? ((acertosNum / tentativasNum) * 100).toFixed(1)
    : '0.0';

  async function salvarRelatorio() {
    setCarregando(true);
    try {
      await api.post('/aproveitamento', {
        tentativas: tentativasNum,
        acertos: acertosNum,
        // tempo não é coletado manualmente — virá do sensor futuramente
      });

      Alert.alert('Salvo! 🏀', 'Treino registrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('TelaPrincipalRelatorio') }
      ]);
    } catch (erro) {
      const msg = erro.response?.data?.mensagem || 'Erro ao salvar o treino.';
      Alert.alert('Erro', msg);
    } finally {
      setCarregando(false);
    }
  }

  // ── ETAPA 1: formulário + contadores ────────────────────────────────────────
  if (etapa === 1) {
    return (
      <GradientWrapper style={estilos.tela}>
        <ScrollView contentContainerStyle={estilos.scrollContent}>

          <View style={estilosGlobais.cabecalho}>
            <Text style={estilosGlobais.titulo}>Relatórios</Text>
            <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
          </View>

          <View style={estilos.card}>

            {/* Identificação */}
            <Text style={estilos.secaoTitulo}>Identificação</Text>

            <Text style={estilos.label}>Nome do treino:</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ex: Treino de lance livre"
              placeholderTextColor="#666"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={estilos.label}>Data:</Text>
            <TextInput
              style={estilos.input}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              placeholderTextColor="#666"
              value={data}
              onChangeText={(t) => setData(mascaraData(t))}
              maxLength={10}
            />

            <Text style={estilos.label}>Descrição:</Text>
            <TextInput
              style={estilos.inputDescricao}
              placeholder="Detalhes do treino..."
              multiline
              placeholderTextColor="#666"
              value={descricao}
              onChangeText={setDescricao}
            />

            {/* Divisor */}
            <View style={estilos.divisor} />

            {/* Contadores */}
            <Text style={estilos.secaoTitulo}>Contagem</Text>

            <View style={estilos.linhaContador}>
              <Text style={estilos.labelContador}>Arremessos:</Text>
              <TextInput
                style={estilos.caixaNumero}
                keyboardType="numeric"
                value={tentativas}
                onChangeText={handleTentativas}
              />
            </View>

            <View style={estilos.linhaContador}>
              <Text style={estilos.labelContador}>Acertos:</Text>
              <TextInput
                style={estilos.caixaNumero}
                keyboardType="numeric"
                value={acertos}
                onChangeText={handleAcertos}
              />
            </View>

            <View style={estilos.linhaContador}>
              <Text style={estilos.labelContador}>Erros:</Text>
              {/* Erros é calculado automaticamente */}
              <View style={[estilos.caixaNumero, estilos.caixaReadOnly]}>
                <Text style={estilos.textoReadOnly}>{erros}</Text>
              </View>
            </View>

            <TouchableOpacity style={estilos.botao} onPress={avancarEtapa}>
              <Text style={estilos.textoBotao}>Continuar →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NavegacaoInferior />
      </GradientWrapper>
    );
  }

  // ── ETAPA 2: resumo e confirmação ────────────────────────────────────────────
  return (
    <GradientWrapper style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.scrollContent}>

        <View style={estilosGlobais.cabecalho}>
          <Text style={estilosGlobais.titulo}>Relatórios</Text>
          <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
        </View>

        <View style={estilos.card}>
          <Text style={estilos.secaoTitulo}>Resumo do treino</Text>

          <Text style={estilos.resumoNome}>{nome}</Text>
          {data ? <Text style={estilos.resumoData}>{data}</Text> : null}
          {descricao ? <Text style={estilos.resumoDescricao}>{descricao}</Text> : null}

          <View style={estilos.divisor} />

          <View style={estilos.linhaEstatistica}>
            <Text style={estilos.labelEstat}>Arremessos:</Text>
            <Text style={estilos.valorEstat}>{tentativasNum}</Text>
          </View>
          <View style={estilos.linhaEstatistica}>
            <Text style={estilos.labelEstat}>Acertos:</Text>
            <Text style={estilos.valorEstat}>{acertosNum}</Text>
          </View>
          <View style={estilos.linhaEstatistica}>
            <Text style={estilos.labelEstat}>Erros:</Text>
            <Text style={estilos.valorEstat}>{erros}</Text>
          </View>
          <View style={estilos.linhaEstatistica}>
            <Text style={estilos.labelEstat}>Aproveitamento:</Text>
            <Text style={[estilos.valorEstat, { color: '#700000' }]}>{aproveitamento}%</Text>
          </View>

          <View style={estilos.rowBotoes}>
            <TouchableOpacity
              style={[estilos.botaoAcao, estilos.botaoCinza]}
              onPress={() => setEtapa(1)}
            >
              <Text style={estilos.textoBotao}>← Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botaoAcao, carregando && { opacity: 0.7 }]}
              onPress={salvarRelatorio}
              disabled={carregando}
            >
              {carregando
                ? <ActivityIndicator color="#fff" />
                : <Text style={estilos.textoBotao}>Salvar</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, paddingTop: 50 },
  scrollContent: { alignItems: 'center', paddingBottom: 100, paddingTop: 10 },
  card: {
    backgroundColor: '#FFF', width: '90%', borderRadius: 20,
    padding: 20, elevation: 5, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4,
  },
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#700000', marginBottom: 12, marginTop: 4 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 10 },
  input: {
    backgroundColor: '#D9D9D9', borderRadius: 5,
    padding: 10, marginTop: 5, fontSize: 15, color: '#000',
  },
  inputDescricao: {
    backgroundColor: '#D9D9D9', borderRadius: 5, padding: 10,
    marginTop: 5, fontSize: 15, height: 80, color: '#000', textAlignVertical: 'top',
  },
  divisor: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
  linhaContador: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  labelContador: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  caixaNumero: {
    backgroundColor: '#D9D9D9', width: 65, height: 55, borderRadius: 5,
    textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000',
  },
  caixaReadOnly: { justifyContent: 'center', alignItems: 'center' },
  textoReadOnly: { fontSize: 20, fontWeight: 'bold', color: '#555' },
  botao: {
    backgroundColor: '#700000', borderRadius: 10, paddingVertical: 13,
    alignItems: 'center', marginTop: 25,
  },
  textoBotao: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  // Resumo
  resumoNome: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  resumoData: { fontSize: 14, color: '#666', marginBottom: 4 },
  resumoDescricao: { fontSize: 14, color: '#444', fontStyle: 'italic' },
  linhaEstatistica: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  labelEstat: { fontSize: 17, fontWeight: 'bold', color: '#000' },
  valorEstat: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  rowBotoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, gap: 10 },
  botaoAcao: { flex: 1, backgroundColor: '#700000', borderRadius: 8, paddingVertical: 13, alignItems: 'center' },
  botaoCinza: { backgroundColor: '#A9A9A9' },
});