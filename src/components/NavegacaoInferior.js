import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Componente de navegação inferior com ícones e rótulos
export default function NavegacaoInferior() {
  return (
    <View style={styles.areaNavegacao}>
      {/* Ícone e texto para Treino */}
      <View style={styles.itemNavegacao}>
        <Image source={require('../../assets/treino.png')} style={styles.icone} />
        <Text style={styles.textoItem}>Treino</Text>
      </View>

      {/* Ícone e texto para Relatório */}
      <View style={styles.itemNavegacao}>
        <Image source={require('../../assets/relatorio.png')} style={styles.icone} />
        <Text style={styles.textoItem}>Relatório</Text>
      </View>

      {/* Ícone e texto para Perfil */}
      <View style={styles.itemNavegacao}>
        <Image source={require('../../assets/perfil.png')} style={styles.icone} />
        <Text style={styles.textoItem}>Perfil</Text>
      </View>
    </View>
  );
}

// Estilos visuais da navegação inferior
const styles = StyleSheet.create({
  areaNavegacao: {
    flexDirection: 'row',
    backgroundColor: '#9e4d01ff',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingBottom: 20,
  },
  itemNavegacao: {
    alignItems: 'center', // Centraliza ícone e texto
  },
  icone: {
    width: 25,
    height: 25,
    resizeMode: 'contain', // Mantém proporção da imagem
  },
  textoItem: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
