import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import api from '../../config/api';
import { pegarJogador } from '../../config/storage';
 
export default function TelaFormulario({ navigation }) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [experiencia, setExperiencia] = useState('iniciante');
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);
 
  // Os valores do dropdown precisam bater exatamente com o ENUM do banco
  const opcoes = [
    { label: 'Iniciante',      valor: 'iniciante' },
    { label: 'Intermediário',  valor: 'intermediario' },
    { label: 'Experiente',     valor: 'experiente' },
    { label: 'Profissional',   valor: 'profissional' },
  ];
 
  const selecionarOpcao = (opcao) => {
    setExperiencia(opcao.valor);
    setAberto(false);
  };
 
  // Formata a data de DD/MM/AAAA para AAAA-MM-DD (formato que o banco aceita)
  function formatarData(data) {
    const partes = data.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return null;
  }
 
  // Aplica máscara de data enquanto o usuário digita (ex: 01/01/2000)
  function mascaraData(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4) return `${numeros.slice(0,2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0,2)}/${numeros.slice(2,4)}/${numeros.slice(4,8)}`;
  }
 
  async function enviarFormulario() {
  if (!nome) {
    Alert.alert('Atenção', 'Por favor, informe seu nome.');
    return;
  }

  setCarregando(true);
  try {
    // Busca o email do jogador salvo no storage para não perder
    const jogadorSalvo = await pegarJogador();

    // Converte data só se estiver completa (10 caracteres: DD/MM/AAAA)
    let dataFormatada = null;
    if (dataNascimento && dataNascimento.length === 10) {
      const partes = dataNascimento.split('/');
      dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    // Manda email junto para não sobrescrever com vazio
    await api.put('/jogador/perfil', {
      nome,
      email: jogadorSalvo?.email || '',
      data_nascimento: dataFormatada,
    });

    await api.put('/jogador/experiencia', { exp_basq: experiencia });

    navigation.navigate('TelaHome');

  } catch (erro) {
    console.log('Erro formulario:', erro.response?.data);
    const msg = erro.response?.data?.mensagem || 'Erro ao salvar seus dados.';
    Alert.alert('Erro', msg);
  } finally {
    setCarregando(false);
  }
}
 
  // Pega o label do item selecionado para mostrar no dropdown
  const labelSelecionado = opcoes.find(o => o.valor === experiencia)?.label || 'Iniciante';
 
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
          <TextInput 
            style={estilos.input} 
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
 
          <Text style={estilos.label}>Data de nascimento</Text>
          <TextInput 
            style={estilos.input} 
            placeholder="DD/MM/AAAA"
            value={dataNascimento}
            onChangeText={(texto) => setDataNascimento(mascaraData(texto))}
            keyboardType="numeric"
            maxLength={10}
          />
 
          <Text style={estilos.label}>Experiência</Text>
          <TouchableOpacity 
            style={estilos.dropdown} 
            onPress={() => setAberto(!aberto)}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoDropdown}>{labelSelecionado}</Text>
            <Text style={estilos.setinha}>▼</Text>
          </TouchableOpacity>
 
          {aberto && (
            <View style={estilos.listaOpcoes}>
              {opcoes.map((item) => (
                <TouchableOpacity 
                  key={item.valor} 
                  style={estilos.opcaoItem} 
                  onPress={() => selecionarOpcao(item)}
                >
                  <Text style={estilos.textoOpcao}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
 
          <TouchableOpacity 
            style={[estilos.botao, carregando && { opacity: 0.7 }]}
            onPress={enviarFormulario}
            disabled={carregando}
          >
            {carregando
              ? <ActivityIndicator color="#fff" />
              : <Text style={estilos.textoBotao}>Enviar</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientWrapper>
  );
}
 
const estilos = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, width: '90%' },
  headerForm: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tituloForm: { fontSize: 28, fontWeight: 'bold' },
  miniLogo: { width: 50, height: 50 },
  subtitulo: { fontSize: 13, marginVertical: 15, textAlign: 'justify' },
  label: { fontWeight: 'bold', marginTop: 15 },
  input: { backgroundColor: '#D9D9D9', borderRadius: 5, padding: 12, marginTop: 5 },
  dropdown: { backgroundColor: '#D9D9D9', borderRadius: 5, padding: 12, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textoDropdown: { fontSize: 14, color: '#000' },
  setinha: { fontSize: 12, color: '#555' },
  listaOpcoes: { backgroundColor: '#EBEBEB', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, marginTop: -2, borderWidth: 1, borderColor: '#D9D9D9' },
  opcaoItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' },
  textoOpcao: { fontSize: 14 },
  botao: { backgroundColor: '#700000', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 50, alignItems: 'center', alignSelf: 'center', marginTop: 30, marginBottom: 10 },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});
 