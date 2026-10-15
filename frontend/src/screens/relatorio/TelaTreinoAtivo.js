import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, BackHandler, Alert } from 'react-native';
import Constants from 'expo-constants';
import GradientWrapper from '../../components/GradientWrapper';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import MQTTService from '../../services/mqttService';
import StatusModal from '../../components/StatusModal';
import LightControl from '../../components/LightControl';
import Gauges from '../../components/Gauges';
import api from '../../config/api';
import { nomeDaPosicao } from '../../config/posicoes';
import CORES from '../../styles/cores';
import { trocarTela } from '../../config/trocarTela';

const mqtt = new MQTTService();

const { mqttHost, mqttPort, mqttPath, mqttUser, mqttPass } =
  Constants.expoConfig.extra;

export default function TelaTreinoAtivo({ navigation, route }) {
  const { titulo, totalArremessos, totalTempo, aoFinalizar, posicao } = route.params;

  const [isConnected, setIsConnected] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSensorOn, setIsSensorOn] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(totalTempo * 60);
  const [treinoAtivo, setTreinoAtivo] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [motivoFim, setMotivoFim] = useState(null);

  const acertosRef = useRef(0);
  const treinoAtivoRef = useRef(true);
  const salvandoRef = useRef(false); // evita salvar o mesmo treino duas vezes

  // Botão voltar do celular: durante o treino abre o "Treino encerrado" (para o
  // jogador decidir salvar); depois de encerrado, não deixa sair sem salvar.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (treinoAtivoRef.current) {
        setMotivoFim('manual');
        encerrarTreino();
      }
      return true; // nunca volta para a tela anterior por aqui
    });
    return () => sub.remove();
  }, []);

  const mqttConfig = {
    host: mqttHost,
    port: parseInt(mqttPort),
    path: mqttPath,
    user: mqttUser,
    pass: mqttPass,
    clientId: 'RN_App_' + Math.random(),
  };

  useEffect(() => {
    startConnection();
    return () => mqtt.client?.disconnect();
  }, []);

  const startConnection = () => {
    setShowError(false);
    mqtt.connect(
      mqttConfig,
      (topic, message) => {
        if (topic === 'arremesso/acerto' && treinoAtivoRef.current) {
          if (message === '1') {
            setIsSensorOn(true);
            acertosRef.current += 1;
            setAcertos(acertosRef.current);
          }
        }
      },
      () => {
        setIsConnected(true);
        mqtt.subscribe('arremesso/acerto');
      },
      () => {
        setIsConnected(false);
        setShowError(true);
      }
    );
  };

  useEffect(() => {
    if (isSensorOn) {
      const timer = setTimeout(() => setIsSensorOn(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSensorOn]);

  useEffect(() => {
    if (!treinoAtivo) return;
    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setMotivoFim('tempo');
          encerrarTreino();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [treinoAtivo]);

  useEffect(() => {
    if (treinoAtivo && acertos > 0 && acertos >= totalArremessos) {
      setMotivoFim('completo');
      encerrarTreino();
    }
  }, [acertos]);

  const encerrarTreino = () => {
    treinoAtivoRef.current = false;
    setTreinoAtivo(false);
    setShowEndModal(true);
  };

  const salvarSessao = async (totalFinal) => {
    if (salvandoRef.current) return; // toque duplo no botão
    salvandoRef.current = true;

    const segundosUsados = totalTempo * 60 - tempoRestante;
    const minutos = Math.floor(segundosUsados / 60);
    const segundos = segundosUsados % 60;
    const tempo = `${minutos}:${String(segundos).padStart(2, '0')}`;

    let nivelSubiu = null; // nome do novo nível, se o jogador subiu com este treino
    try {
      const resposta = await api.post('/aproveitamento', {
        tentativas: totalFinal,
        acertos: acertosRef.current,
        tempo,
        titulo,
        posicao: posicao || null,
      });
      if (resposta.data?.nivel?.subiu) nivelSubiu = resposta.data.nivel.nome;
    } catch (erro) {}

    setShowEndModal(false);

    // Se veio de uma aula, volta para ela (fecha o treino e a configuração).
    // Senão, recomeça a pilha no histórico: assim o botão voltar do celular
    // nunca reabre o treino que acabou de ser finalizado.
    if (aoFinalizar) {
      navigation.pop(2);
      if (nivelSubiu) Alert.alert('Parabéns! 🏆', `Você subiu para o nível ${nivelSubiu}!`);
    } else {
      // O histórico mostra o aviso de novo nível (funciona também na web)
      trocarTela(navigation, 'TelaHistoricoTreinos', { nivelSubiu });
    }
  };

  const porcentagemAcertos = totalArremessos > 0
    ? Math.round((acertos / totalArremessos) * 100)
    : 0;

  const porcentagemTempo = Math.round((tempoRestante / (totalTempo * 60)) * 100);

  const formatarTempo = (seg) => {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <GradientWrapper style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.scroll}>

        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.subtitulo}>
          {acertos} / {totalArremessos} acertos
        </Text>
        {!!posicao && <Text style={estilos.posicao}>📍 {nomeDaPosicao(posicao)}</Text>}

        <View style={estilos.statusConexao}>
          <View style={[estilos.bolinha, { backgroundColor: isConnected ? CORES.sucesso : CORES.aviso }]} />
          <Text style={estilos.textoConexao}>
            {isConnected ? 'Sensor conectado' : 'Conectando ao sensor...'}
          </Text>
        </View>

        <LightControl isLightOn={isSensorOn} />

        <Gauges
          scores={porcentagemAcertos}
          tempoRestante={porcentagemTempo}
          tempoLabel={formatarTempo(tempoRestante)}
        />

        <TouchableOpacity
          style={estilos.btnEncerrar}
          onPress={() => { setMotivoFim('manual'); encerrarTreino(); }}
        >
          <Text style={estilos.textoBotao}>Encerrar Treino</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal visible={showEndModal} transparent animationType="fade">
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalTitulo}>Treino Encerrado</Text>

            {motivoFim === 'completo' ? (
              <>
                <Text style={estilos.modalTexto}>
                  Parabéns! Você completou todos os {totalArremessos} arremessos com {acertos} acertos.
                </Text>
                <TouchableOpacity style={estilos.btnConfirmar} onPress={() => salvarSessao(totalArremessos)}>
                  <Text style={estilos.textoBotao}>Salvar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={estilos.modalTexto}>
                  Você realizou todos os {totalArremessos} arremessos planejados?
                </Text>
                <TouchableOpacity style={estilos.btnConfirmar} onPress={() => salvarSessao(totalArremessos)}>
                  <Text style={estilos.textoBotao}>Sim, salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.btnAjustar} onPress={() => salvarSessao(acertosRef.current)}>
                  <Text style={estilos.textoBotao}>Não, arremessei apenas {acertos}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <StatusModal visible={showError} onRetry={startConnection} onLater={() => setShowError(false)} />
      <NavegacaoInferior />
    </GradientWrapper>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1 },
  scroll: { padding: 24, alignItems: 'center', paddingBottom: 100 },
  titulo: { color: CORES.branco, fontSize: 24, fontWeight: 'bold', marginTop: 50, marginBottom: 4 },
  subtitulo: { color: CORES.branco, fontSize: 18, marginBottom: 12, opacity: 0.8 },
  posicao: { color: CORES.branco, fontSize: 14, opacity: 0.8, marginBottom: 12 },
  statusConexao: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  bolinha: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  textoConexao: { color: CORES.branco, fontSize: 13, opacity: 0.9 },
  btnEncerrar: { backgroundColor: CORES.primaria, padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 20 },
  textoBotao: { color: CORES.branco, fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: CORES.primariaEscura, padding: 30, borderRadius: 20, width: '85%', alignItems: 'center', borderWidth: 1, borderColor: CORES.primaria },
  modalTitulo: { color: CORES.branco, fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  modalTexto: { color: '#FFB3B3', textAlign: 'center', marginBottom: 24, fontSize: 15 },
  btnConfirmar: { backgroundColor: CORES.primaria, padding: 14, borderRadius: 12, width: '100%', marginBottom: 12, alignItems: 'center' },
  btnAjustar: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 14, borderRadius: 12, width: '100%', alignItems: 'center' },
});