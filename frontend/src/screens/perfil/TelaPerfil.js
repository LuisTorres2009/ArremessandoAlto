import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import GradientWrapper from '../../components/GradientWrapper';
import estilosGlobais from '../../styles/styles';
import NavegacaoInferior from '../../components/NavegacaoInferior';

export default function TelaPerfil({ navigation }) {
  return (
    <GradientWrapper style={estilos.tela}>
      
      {/* Cabeçalho Padronizado com estilosGlobais */}
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.titulo}>Perfil</Text>
        <Image 
          source={require('../../assets/basquete.png')} 
          style={estilosGlobais.icone} 
        />
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContent}>
        {/* Card Branco Central */}
        <View style={estilos.card}>
          
          {/* Ícone de Engrenagem */}
          <TouchableOpacity style={estilos.configBtn}>
            <Ionicons name="settings-sharp" size={24} color="#A9A9A9" />
          </TouchableOpacity>

          {/* Avatar e Botão de Edição de Foto */}
          <View style={estilos.avatarContainer}>
            <View style={estilos.avatarPlaceholder}>
              <Ionicons name="person" size={80} color="#ffffffff" />
            </View>
            <TouchableOpacity style={estilos.editIconBtn}>
              <MaterialIcons name="edit" size={20} color="#ffffffff" />
            </TouchableOpacity>
          </View>

          {/* Informações Exibidas */}
          <View style={estilos.infoSection}>
            <Text style={estilos.label}>Nome</Text>
            <View style={estilos.campoDado}>
              <Text style={estilos.textoDado}>Nome</Text>
            </View>

            <Text style={estilos.label}>Data de nascimento</Text>
            <View style={estilos.campoDado}>
              <Text style={estilos.textoDado}>00/00/0000</Text>
            </View>

            <Text style={estilos.label}>Experiência</Text>
            <View style={estilos.campoDado}>
              <Text style={estilos.textoDado}>Iniciante</Text>
            </View>

            <Text style={estilos.label}>Email</Text>
            <View style={estilos.campoDado}>
              <Text style={estilos.textoDado}>exemplo@email.com</Text>
            </View>
          </View>

          {/* Botão Editar Dados */}
          <TouchableOpacity 
            style={estilos.botaoEditar} 
            onPress={() => navigation.navigate('TelaPerfilEdicao')}
          >
            <Text style={estilos.textoBotao}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 50,
  },
  scrollContent: {
    alignItems: 'center',
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
    color: '#000',
    marginTop: 10,
  },
  campoDado: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 12,
    marginTop: 3,
  },
  textoDado: {
    color: '#777',
    fontSize: 15,
  },
  botaoEditar: {
    backgroundColor: '#700000',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
