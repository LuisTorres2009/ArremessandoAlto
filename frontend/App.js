import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importações das telas

import TelaAnimacao from './src/screens/animacao/TelaAnimacao';
import TelaLogin from './src/screens/login/TelaLogin';
import TelaCadastro from './src/screens/cadastro/TelaCadastro';
import TelaFormulario from './src/screens/formulario/TelaFormulario';
import TelaHome from './src/screens/treinos/TelaHome';
import TelaTreino from './src/screens/treinos/TelaTreino';
import TelaPerfil from './src/screens/perfil/TelaPerfil';
import TelaPerfilEdicao from './src/screens/perfil/TelaPerfilEdicao';
import TelaRelatorioPrincipal from './src/screens/relatorio/TelaPrincipal';
import TelaRelatorioConectar from './src/screens/relatorio/TelaConectar';
import TelaFormularioRelatorio from './src/screens/relatorio/TelaFormulario';
import TelaContadorArremessos from './src/screens/relatorio/TelaContadorArremessos';
import TelaContadorAirballs from './src/screens/relatorio/TelaContadorAirballs';
import TelaResumoRelatorio from './src/screens/relatorio/TelaResumoRelatorio';
import TelaDetalhesCard from './src/screens/relatorio/TelaDetalhesCard';
import TelaRelatorioPrincipalComCard from './src/screens/relatorio/TelaPrincipalComCard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TelaAnimacao" 
        screenOptions={{ 
          headerShown: false,
          animation: 'none' // Mantido conforme sua solicitação no código base
        }}
      >
        <Stack.Screen name="TelaAnimacao" component={TelaAnimacao} />

        {/* Fluxo de Autenticação */}
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        <Stack.Screen name="TelaFormulario" component={TelaFormulario} />

        {/* Telas Principais */}
        <Stack.Screen name="TelaHome" component={TelaHome} />
        <Stack.Screen name="TelaTreino" component={TelaTreino} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaPerfilEdicao" component={TelaPerfilEdicao} />
        <Stack.Screen name="TelaRelatorioConectar" component={TelaRelatorioConectar} />
        <Stack.Screen name="TelaRelatorioPrincipal" component={TelaRelatorioPrincipal} />
        <Stack.Screen name="TelaFormularioRelatorio" component={TelaFormularioRelatorio} />
        <Stack.Screen name="TelaContadorArremessos" component={TelaContadorArremessos} />
        <Stack.Screen name="TelaContadorAirballs" component={TelaContadorAirballs} />
        <Stack.Screen name="TelaResumoRelatorio" component={TelaResumoRelatorio} />
        <Stack.Screen name="TelaRelatorioPrincipalComCard" component={TelaRelatorioPrincipalComCard} />
        <Stack.Screen name="TelaDetalhesCard" component={TelaDetalhesCard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
