import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';
import GradientWrapper from '../../components/GradientWrapper';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import estilosGlobais from '../../styles/styles';
import api from '../../config/api';
import { limparSessao } from '../../config/storage';

export default function TelaPerfil({ navigation }) {
  const [jogador, setJogador] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [])
  );

  async function carregarPerfil() {
    setCarregando(true);
    try {
      const resposta = await api.get('/jogador/perfil');
      setJogador(resposta.data);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar o perfil.');
    } finally {
      setCarregando(false);
    }
  }

  async function sair() {
    await limparSessao();
    navigation.reset({ index: 0, routes: [{ name: 'TelaLogin' }] });
  }

  function formatarData(data) {
    if (!data) return '—';
    const partes = data.split('T')[0].split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function formatarExperiencia(exp) {
    const mapa = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      experiente: 'Experiente',
      profissional: 'Profissional',
    };
    return mapa[exp] || exp || '—';
  }

  return (
    <GradientWrapper style={estilos.tela}>
      
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Perfil</Text>
        <Image source={require('../../assets/basquete.png')} style={estilosGlobais.icone} />
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.card}>
          
          <TouchableOpacity style={estilos.configBtn} onPress={sair}>
            <Ionicons name="log-out-outline" size={24} color="#A9A9A9" />
          </TouchableOpacity>

          <View style={estilos.avatarContainer}>
            <View style={estilos.avatarPlaceholder}>
              <Ionicons name="person" size={80} color="#fff" />
            </View>
            <TouchableOpacity style={estilos.editIconBtn}>
              <MaterialIcons name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {carregando ? (
            <ActivityIndicator size="large" color="#700000" style={{ marginVertical: 30 }} />
          ) : (
            <View style={estilos.infoSection}>
              <Text style={estilos.label}>Nome</Text>
              <View style={estilos.campoDado}>
                <Text style={estilos.textoDado}>{jogador?.nome || '—'}</Text>
              </View>

              <Text style={estilos.label}>Data de nascimento</Text>
              <View style={estilos.campoDado}>
                <Text style={estilos.textoDado}>{formatarData(jogador?.data_nascimento)}</Text>
              </View>

              <Text style={estilos.label}>Experiência</Text>
              <View style={estilos.campoDado}>
                <Text style={estilos.textoDado}>{formatarExperiencia(jogador?.exp_basq)}</Text>
              </View>

              <Text style={estilos.label}>Email</Text>
              <View style={estilos.campoDado}>
                <Text style={estilos.textoDado}>{jogador?.email || '—'}</Text>
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={estilos.botaoEditar} 
            onPress={() => navigation.navigate('TelaPerfilEdicao', { jogador })}
          >
            <Text style={estilos.textoBotao}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, paddingTop: 50 },
  scrollContent: { alignItems: 'center' },
  card: { backgroundColor: '#FFF', width: '90%', borderRadius: 20, padding: 15, alignItems: 'center', elevation: 5 },
  configBtn: { alignSelf: 'flex-end' },
  avatarContainer: { position: 'relative', marginBottom: 10 },
  avatarPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  editIconBtn: { backgroundColor: '#700000', width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 5, right: 5, borderWidth: 3, borderColor: '#FFF' },
  infoSection: { width: '100%', paddingHorizontal: 10 },
  label: { fontWeight: 'bold', fontSize: 16, color: '#000', marginTop: 10 },
  campoDado: { backgroundColor: '#D9D9D9', borderRadius: 8, padding: 12, marginTop: 3 },
  textoDado: { color: '#777', fontSize: 15 },
  botaoEditar: { backgroundColor: '#700000', borderRadius: 15, paddingVertical: 12, paddingHorizontal: 50, alignItems: 'center', alignSelf: 'center', marginTop: 25, marginBottom: 10 },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});