import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import api from '../../config/api';

export default function TelaHome({ navigation }) {
  const [semanas, setSemanas] = useState([]);
  const [progresso, setProgresso] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    setCarregando(true);
    try {
      const resProgresso = await api.get('/aulas/progresso');
      setProgresso(resProgresso.data);

      // Busca semanas existentes no banco
      const listaSemanas = [];
      let semanaAtual = 1;

      while (true) {
        const res = await api.get(`/aulas?semana=${semanaAtual}`);
        if (res.data.length === 0) break;
        listaSemanas.push({
          id: semanaAtual,
          titulo: `Semana ${semanaAtual}`,
          totalAulas: res.data.length,
        });
        semanaAtual++;
      }

      setSemanas(listaSemanas);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os treinos.');
    } finally {
      setCarregando(false);
    }
  }

  function semanaCompleta(id) {
    return progresso && progresso.semana_ult_aula > id;
  }

  function semanaAtiva(id) {
    if (!progresso) return id === 1;
    return progresso.semana_ult_aula === id;
  }

  return (
    <GradientWrapper style={estilos.tela}>
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Home</Text>
        <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 60 }} />
      ) : (
        <ScrollView style={estilos.listaSemanas}>
          {semanas.length === 0 ? (
            <Text style={estilos.textoVazio}>Nenhum treino disponível ainda.</Text>
          ) : (
            semanas.map((semana) => {
              const completa = semanaCompleta(semana.id);
              const ativa = semanaAtiva(semana.id);
              return (
                <TouchableOpacity
                  key={semana.id}
                  style={[estilos.caixaSemana, completa && estilos.caixaCompleta, ativa && estilos.caixaAtiva]}
                  onPress={() => navigation.navigate('TelaTreino', { semana: semana.id })}
                >
                  <View style={estilos.linhaHeader}>
                    <Text style={estilos.tituloSemana}>{semana.titulo}</Text>
                    {completa && <Text style={estilos.badge}>✓ Concluída</Text>}
                    {ativa && <Text style={[estilos.badge, estilos.badgeAtiva]}>Em andamento</Text>}
                  </View>
                  <Text style={estilos.subtituloSemana}>{semana.totalAulas} aulas</Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, paddingTop: 50 },
  listaSemanas: { flex: 1, paddingHorizontal: 20 },
  caixaSemana: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 18, marginBottom: 15 },
  caixaCompleta: { backgroundColor: '#E8F5E9', borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  caixaAtiva: { backgroundColor: '#FFF8E1', borderLeftWidth: 4, borderLeftColor: '#700000' },
  linhaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tituloSemana: { fontSize: 18, fontWeight: 'bold' },
  subtituloSemana: { fontSize: 14, color: '#555', marginTop: 4 },
  badge: { fontSize: 11, color: '#4CAF50', fontWeight: 'bold', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeAtiva: { color: '#700000', backgroundColor: '#FFE0E0' },
  textoVazio: { color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 16 },
});