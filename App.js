import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './src/screens/TelaInicial';
import TelaTreino from './src/screens/TelaTreino';
import TelaAnimacao from './src/screens/TelaAnimacao';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaAnimacao" component={TelaAnimacao} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaTreino" component={TelaTreino} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
