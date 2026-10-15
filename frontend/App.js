import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TelaAnimacao from './src/screens/animacao/TelaAnimacao';
import TelaLogin from './src/screens/login/TelaLogin';
import TelaCadastro from './src/screens/cadastro/TelaCadastro';
import TelaFormulario from './src/screens/formulario/TelaFormulario';
import TelaSemanas from './src/screens/treinos/TelaSemanas';
import TelaTreino from './src/screens/treinos/TelaTreino';
import TelaPerfil from './src/screens/perfil/TelaPerfil';
import TelaPerfilEdicao from './src/screens/perfil/TelaPerfilEdicao';
import TelaHistoricoTreinos from './src/screens/relatorio/TelaHistoricoTreinos';
import TelaConfigurarTreino from './src/screens/relatorio/TelaConfigurarTreino';
import TelaTreinoAtivo from './src/screens/relatorio/TelaTreinoAtivo';
import TelaDetalhesTreino from './src/screens/relatorio/TelaDetalhesTreino';
import TelaEstatisticas from './src/screens/relatorio/TelaEstatisticas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TelaAnimacao"
          screenOptions={({ route }) => ({
            headerShown: false,
            contentStyle: { backgroundColor: '#2a0404' },
            animation: route.params?.direcao === 'esquerda' ? 'slide_from_left' : 'slide_from_right',
          })}
        >
          <Stack.Screen name="TelaAnimacao" component={TelaAnimacao} />
          <Stack.Screen name="TelaLogin" component={TelaLogin} />
          <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
          <Stack.Screen name="TelaFormulario" component={TelaFormulario} />
          <Stack.Screen name="TelaSemanas" component={TelaSemanas} />

          <Stack.Screen name="TelaTreino" component={TelaTreino} />

          <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
          <Stack.Screen name="TelaPerfilEdicao" component={TelaPerfilEdicao} />
          <Stack.Screen name="TelaHistoricoTreinos" component={TelaHistoricoTreinos} />
          <Stack.Screen name="TelaConfigurarTreino" component={TelaConfigurarTreino} />
          {/* Sem gesto de voltar: o treino em andamento/finalizado não deve ser reaberto */}
          <Stack.Screen name="TelaTreinoAtivo" component={TelaTreinoAtivo} options={{ gestureEnabled: false }} />
          <Stack.Screen name="TelaDetalhesTreino" component={TelaDetalhesTreino} />
          <Stack.Screen name="TelaEstatisticas" component={TelaEstatisticas} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}