import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Tela de animação de entrada do app
export default function TelaAnimacao({ navigation }) {
  // Valores animados para opacidade e escala
  const opacidade = useSharedValue(1);
  const escala = useSharedValue(0.5);

  // Efeito de animação ao montar a tela
  useEffect(() => {
    // Anima a opacidade de 0 para 1
    opacidade.value = withTiming(1, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });

    // Anima a escala de 0.8 para 1
    escala.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    // Timer para navegar automaticamente após 2 segundos
    const temporizador = setTimeout(() => {
      navigation.navigate('TelaInicial');
    }, 2000);

    // Limpa o timer ao desmontar o componente
    return () => clearTimeout(temporizador);
  }, [navigation]);

  // Estilo animado aplicado à view principal
  const estiloAnimado = useAnimatedStyle(() => ({
    opacity: opacidade.value,
    transform: [{ scale: escala.value }],
  }));

  return (
    <Animated.View style={[estilos.container, estiloAnimado]}>
      {/* Imagem central do app */}
      <Image
        source={require('../../assets/basquete.png')}
        style={estilos.imagem}
      />

      {/* Título do app */}
      <Text style={estilos.titulo}>Arremessando Alto</Text>
    </Animated.View>
  );
}

// Estilos visuais da tela de animação
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#550808ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagem: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});
