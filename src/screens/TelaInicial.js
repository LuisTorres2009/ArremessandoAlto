import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import NavegacaoInferior from '../components/NavegacaoInferior';

// Lista de semanas do programa de treino
const semanas = Array.from({ length: 8 }, (_, indice) => ({
  id: indice + 1,
  titulo: `Semana ${indice + 1}`,
  totalExercicios: 7,
}));

// Tela inicial do app
export default function TelaInicial({ navigation }) {
  return (
    <View style={estilos.tela}>
      {/* Cabeçalho com título e ícone */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Arremessando Alto</Text>
        <Image source={require('../../assets/basquete.png')} style={estilos.icone} />
      </View>

      {/* E-mail do usuário */}
      <Text style={estilos.email}>lionelmessi@gmail.com</Text>

      {/* Lista de semanas com botão para navegar para cada treino */}
      <ScrollView style={estilos.listaSemanas}>
        {semanas.map((semana) => (
          <TouchableOpacity
            key={semana.id}
            style={estilos.caixaSemana}
            onPress={() => navigation.navigate('TelaTreino', { week: semana.id })}
          >
            <Text style={estilos.tituloSemana}>{semana.titulo}</Text>
            <Text style={estilos.subtituloSemana}>{semana.totalExercicios} exercícios</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Barra de navegação inferior */}
      <NavegacaoInferior />
    </View>
  );
}

// Estilos visuais da tela inicial
const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#550808ff',
    paddingTop: 50,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  icone: {
    width: 50,
    height: 50,
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 25,
    marginBottom: 40,
  },
  listaSemanas: {
    flex: 1,
    paddingHorizontal: 20,
  },
  caixaSemana: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
  },
  tituloSemana: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtituloSemana: {
    fontSize: 14,
    color: '#555',
  },
});
