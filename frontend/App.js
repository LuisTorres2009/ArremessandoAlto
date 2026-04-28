import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ─── Animação ─────────────────────────────────────────────────────────────────
import TelaAnimacao from './src/screens/animacao/TelaAnimacao';

// ─── Autenticação ─────────────────────────────────────────────────────────────
import TelaLogin from './src/screens/login/TelaLogin';
import TelaCadastro from './src/screens/cadastro/TelaCadastro';
import TelaFormulario from './src/screens/formulario/TelaFormulario';

// ─── Treinos ──────────────────────────────────────────────────────────────────
import TelaHome from './src/screens/treinos/TelaHome';
import TelaTreino from './src/screens/treinos/TelaTreino';

// ─── Perfil ───────────────────────────────────────────────────────────────────
import TelaPerfil from './src/screens/perfil/TelaPerfil';
import TelaPerfilEdicao from './src/screens/perfil/TelaPerfilEdicao';

// ─── Relatório ────────────────────────────────────────────────────────────────
// ⚠️ Telas deletadas (não importar mais):
//    TelaContadorArremessos, TelaContadorAirballs,
//    TelaResumoRelatorio, TelaPrincipalComCard
//    → Todas foram unificadas no TelaFormularioRelatorio
import TelaPrincipal from './src/screens/relatorio/TelaPrincipal';
import TelaConectar from './src/screens/relatorio/TelaConectar';
import TelaFormularioRelatorio from './src/screens/relatorio/TelaFormularioRelatorio';
import TelaDetalhesCard from './src/screens/relatorio/TelaDetalhesCard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaAnimacao"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        {/* Animação de entrada */}
        <Stack.Screen name="TelaAnimacao" component={TelaAnimacao} />

        {/* Fluxo de autenticação */}
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        <Stack.Screen name="TelaFormulario" component={TelaFormulario} />

        {/* Treinos */}
        <Stack.Screen name="TelaHome" component={TelaHome} />
        <Stack.Screen name="TelaTreino" component={TelaTreino} />

        {/* Perfil */}
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaPerfilEdicao" component={TelaPerfilEdicao} />

        {/* Relatório */}
        <Stack.Screen name="TelaPrincipalRelatorio" component={TelaPrincipal} />
        <Stack.Screen name="TelaConectar" component={TelaConectar} />
        <Stack.Screen name="TelaFormularioRelatorio" component={TelaFormularioRelatorio} />
        <Stack.Screen name="TelaDetalhesCard" component={TelaDetalhesCard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}