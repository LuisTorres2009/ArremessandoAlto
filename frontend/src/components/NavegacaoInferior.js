import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavegacaoInferior() {
  const navigation = useNavigation();

  return (
    <View style={styles.areaNavegacao}>
      {/* Botão Treino */}
      <TouchableOpacity 
        style={styles.itemNavegacao} 
        onPress={() => navigation.navigate('TelaHome')} // Geralmente o treino principal é a Home/Inicial
      >
        <Image source={require('../assets/treino.png')} style={styles.icone} />
        <Text style={styles.textoItem}>Treino</Text>
      </TouchableOpacity>

      {/* Botão Relatório */}
      <TouchableOpacity 
        style={styles.itemNavegacao} 
        onPress={() => navigation.navigate('TelaPrincipalRelatorio')}
      >
        <Image source={require('../assets/relatorio.png')} style={styles.icone} />
        <Text style={styles.textoItem}>Relatório</Text>
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity 
        style={styles.itemNavegacao} 
        onPress={() => navigation.navigate('TelaPerfil')}
      >
        <Image source={require('../assets/perfil.png')} style={styles.icone} />
        <Text style={styles.textoItem}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  areaNavegacao: {
    flexDirection: 'row',
    backgroundColor: '#420404',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingBottom: 20,
  },
  itemNavegacao: {
    alignItems: 'center',
  },
  icone: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  textoItem: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});