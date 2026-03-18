import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientWrapper = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#550808ff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[estilos.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientWrapper;