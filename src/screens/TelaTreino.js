import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import NavegacaoInferior from '../components/NavegacaoInferior';

export default function TelaTreino({ route }) {
  const { week } = route.params;
  const primeiroDia = (week - 1) * 7 + 1;

  // Gera os 7 dias da semana
  const dias = Array.from({ length: 7 }, (_, i) => {
    const numero = primeiroDia + i;
    return {
      id: numero,
      titulo: `Dia ${numero}`,
      descricao: `Conteúdo exclusivo do Dia ${numero}. Aqui você poderá adicionar vídeos, instruções ou exercícios específicos.`,
    };
  });

  // Estado para armazenar o dia atualmente expandido
  const [diaExpandido, setDiaExpandido] = useState(null);

  // Alterna entre expandir ou recolher o dia
  const alternarDia = (id) => {
    setDiaExpandido(prev => (prev === id ? null : id));
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Semana {week}</Text>

        <FlatList
          data={dias}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={estilos.caixaDia}
              onPress={() => alternarDia(item.id)}
              activeOpacity={0.8}
            >
              <Text style={estilos.textoDia}>{item.titulo}</Text>

              {diaExpandido === item.id && (
                <View style={estilos.conteudoExpandido}>
                  <Text style={estilos.descricao}>{item.descricao}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          estimatedItemSize={100}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <NavegacaoInferior />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#550808ff',
  },
  conteudo: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  caixaDia: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoDia: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  conteudoExpandido: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  descricao: {
    fontSize: 13,
    color: '#333',
    fontStyle: 'italic',
  },
});