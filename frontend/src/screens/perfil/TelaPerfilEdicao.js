import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';

export default function TelaPerfilEdicao({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>
      
      {/* Cabeçalho Padronizado com estilosGlobais */}
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Editar Perfil</Text>
        <Image 
          source={require('../../assets/basquete.png')} 
          style={estilosGlobais.icone} 
        />
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.card}>
          
          <TouchableOpacity style={estilos.configBtn}>
            <Ionicons name="settings-sharp" size={24} color="#A9A9A9" />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={estilos.avatarContainer}>
            <View style={estilos.avatarPlaceholder}>
              <Ionicons name="person" size={80} color="#ffffffff" />
            </View>
            <TouchableOpacity style={estilos.editIconBtn}>
              <MaterialIcons name="camera-alt" size={20} color="#ffffffff" />
            </TouchableOpacity>
          </View>

          {/* Campos Editáveis (TextInput) */}
          <View style={estilos.infoSection}>
            <Text style={estilos.label}>Nome</Text>
            <TextInput 
              style={estilos.input}
              defaultValue="Nome do Usuário"
            />

            <Text style={estilos.label}>Data de nascimento</Text>
            <TextInput 
              style={estilos.input}
              defaultValue="00/00/0000"
              keyboardType="numeric"
            />

            <Text style={estilos.label}>Experiência</Text>
            <TextInput 
              style={estilos.input}
              defaultValue="Iniciante"
            />

            <Text style={estilos.label}>Email</Text>
            <TextInput 
              style={estilos.input}
              defaultValue="exemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Botões Lado a Lado */}
          <View style={estilos.containerBotoes}>
            <TouchableOpacity 
              style={[estilos.botao, estilos.botaoCancelar]} 
              onPress={() => navigation.navigate('TelaPerfil')}
            >
              <Text style={estilos.textoBotao}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[estilos.botao, estilos.botaoSalvar]} 
              onPress={() => navigation.navigate('TelaPerfil')}
            >
              <Text style={estilos.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>

    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 50, // Mantendo o espaçamento local
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
  },
  configBtn: {
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconBtn: {
    backgroundColor: '#700000',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  infoSection: {
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 12,
    marginTop: 3,
    color: '#000',
    fontSize: 15,
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  botao: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoCancelar: {
    backgroundColor: '#A9A9A9',
  },
  botaoSalvar: {
    backgroundColor: '#700000',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});