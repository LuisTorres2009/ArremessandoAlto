import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';

export default function TelaFormulario({ navigation }) {
  const [experiencia, setExperiencia] = useState('Iniciante');
  const [aberto, setAberto] = useState(false);

  const opcoes = ['Iniciante', 'Intermediário', 'Experiente', 'Profissional'];

  const selecionarOpcao = (opcao) => {
    setExperiencia(opcao);
    setAberto(false);
  };

  return (
    <GradientWrapper style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <View style={estilos.card}>
          <View style={estilos.headerForm}>
             <Text style={estilos.tituloForm}>Formulário</Text>
             <Image source={require('../../assets/basquete.png')} style={estilos.miniLogo} />
          </View>
          
          <Text style={estilos.subtitulo}>
            Responda esse formulário para preencher seus dados pessoais e para reconhecermos seu nível de experiência no esporte
          </Text>

          <Text style={estilos.label}>Nome</Text>
          <TextInput style={estilos.input} placeholder="Digite seu nome" />

          <Text style={estilos.label}>Data de nascimento</Text>
          <TextInput style={estilos.input} placeholder="DD/MM/AAAA" />

          <Text style={estilos.label}>Experiência</Text>
          <TouchableOpacity 
            style={estilos.dropdown} 
            onPress={() => setAberto(!aberto)}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoDropdown}>{experiencia}</Text>
            <Text style={estilos.setinha}>▼</Text>
          </TouchableOpacity>

          {aberto && (
            <View style={estilos.listaOpcoes}>
              {opcoes.map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={estilos.opcaoItem} 
                  onPress={() => selecionarOpcao(item)}
                >
                  <Text style={estilos.textoOpcao}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity 
            style={estilos.botao} 
            onPress={() => navigation.navigate('TelaHome')}
          >
            <Text style={estilos.textoBotao}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scroll: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 40 
  },
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    width: '90%' 
  },
  headerForm: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  tituloForm: { 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  miniLogo: { 
    width: 50, 
    height: 50 
  },
  subtitulo: { 
    fontSize: 13, 
    marginVertical: 15, 
    textAlign: 'justify' 
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 15 
  },
  input: { 
    backgroundColor: '#D9D9D9', 
    borderRadius: 5, 
    padding: 12, 
    marginTop: 5 
  },
  dropdown: { 
    backgroundColor: '#D9D9D9', 
    borderRadius: 5, 
    padding: 12, 
    marginTop: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  textoDropdown: { 
    fontSize: 14, 
    color: '#000' 
  },
  setinha: { 
    fontSize: 12, 
    color: '#555' 
  },
  listaOpcoes: { 
    backgroundColor: '#EBEBEB', 
    borderBottomLeftRadius: 5, 
    borderBottomRightRadius: 5,
    marginTop: -2, 
    borderWidth: 1,
    borderColor: '#D9D9D9'
  },
  opcaoItem: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#D9D9D9' 
  },
  textoOpcao: { 
    fontSize: 14 
  },
  botao: { 
    backgroundColor: '#700000', 
    borderRadius: 10, 
    paddingVertical: 12, 
    paddingHorizontal: 50,
    alignItems: 'center', 
    alignSelf: 'center',
    marginTop: 30, 
    marginBottom: 10
  },
  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});