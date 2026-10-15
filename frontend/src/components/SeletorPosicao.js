import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { nomeDaPosicao } from '../config/posicoes';
import CORES from '../styles/cores';

// Mapa da meia quadra: a cesta fica no topo, o jogador olha para ela.
// Linha de cima = perto da cesta (esquerda, meio, direita);
// linha de baixo = mais longe/atrás (esquerda, atrás, direita).
const LINHAS = [
  ['lateral_esquerda', 'meio', 'lateral_direita'],
  ['lateral_esquerda_atras', 'atras', 'lateral_direita_atras'],
];

// Desenho da quadra. Se onEscolher for passado, as áreas são clicáveis;
// sem ele vira só uma miniatura que mostra a área escolhida.
function Quadra({ valor, onEscolher, largura, altura }) {
  const interativa = !!onEscolher;
  const tamCesta = largura > 100 ? 14 : 6; // menor na miniatura
  const diametroCirculo = largura * 0.22;

  return (
    <View style={[estilos.quadra, { width: largura, height: altura }]}>
      {/* Áreas clicáveis */}
      {LINHAS.map((linha, i) => (
        <View key={i} style={estilos.linhaQuadra}>
          {linha.map((posicao) => {
            const selecionada = posicao === valor;
            const area = [estilos.area, selecionada && estilos.areaSelecionada];
            return interativa ? (
              <TouchableOpacity
                key={posicao}
                style={area}
                activeOpacity={0.7}
                onPress={() => onEscolher(posicao)}
                accessibilityRole="button"
                accessibilityLabel={nomeDaPosicao(posicao)}
              >
                {selecionada && <MaterialIcons name="check" size={22} color={CORES.branco} />}
              </TouchableOpacity>
            ) : (
              <View key={posicao} style={area} />
            );
          })}
        </View>
      ))}

      {/* Desenho por cima (não recebe toque): garrafão, cesta e arco */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {/* Garrafão = exatamente a área "Meio" (coluna do meio da linha de cima).
            Porcentagens, para acompanhar a divisão das áreas mesmo com a borda. */}
        <View style={estilos.garrafao} />
        {/* Círculo do lance livre, centralizado na base do garrafão */}
        <View style={[estilos.circuloLance, { width: diametroCirculo, height: diametroCirculo, borderRadius: diametroCirculo / 2, marginLeft: -diametroCirculo / 2, marginTop: -diametroCirculo / 2 }]} />
        {/* Cesta, centralizada no topo */}
        <View style={[estilos.cesta, { width: tamCesta, height: tamCesta, borderRadius: tamCesta / 2, marginLeft: -tamCesta / 2 }]} />
      </View>
    </View>
  );
}

// Dropdown visual: fechado mostra a área escolhida; aberto mostra a quadra para clicar.
// valor = posição escolhida (ou null). onChange recebe a nova posição (ou null).
export default function SeletorPosicao({ valor, onChange }) {
  const [aberto, setAberto] = useState(false);

  function escolher(posicao) {
    // Tocar de novo na área já escolhida desmarca (a posição é opcional)
    onChange(posicao === valor ? null : posicao);
    setAberto(false);
  }

  return (
    <View>
      <TouchableOpacity style={estilos.campo} onPress={() => setAberto(!aberto)} activeOpacity={0.8}>
        <View style={estilos.campoEsquerda}>
          <Quadra valor={valor} largura={42} altura={32} />
          <Text style={[estilos.textoCampo, !valor && estilos.placeholder]}>
            {nomeDaPosicao(valor) || 'Toque para escolher o local'}
          </Text>
        </View>
        <MaterialIcons
          name={aberto ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={CORES.textoMedio}
        />
      </TouchableOpacity>

      {aberto && (
        <View style={estilos.painel}>
          <Quadra valor={valor} onEscolher={escolher} largura={250} altura={190} />
          <Text style={estilos.dica}>
            {valor ? 'Toque na área escolhida de novo para limpar' : 'Toque na área de onde você vai arremessar'}
          </Text>
        </View>
      )}
    </View>
  );
}

const MADEIRA = '#D9A15E';
const LINHA = 'rgba(255,255,255,0.9)';

const estilos = StyleSheet.create({
  campo: {
    backgroundColor: CORES.cinzaClaro, borderRadius: 10, padding: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  campoEsquerda: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  textoCampo: { fontSize: 16, color: CORES.textoEscuro, marginLeft: 12, flexShrink: 1 },
  placeholder: { color: CORES.textoDesabilitado },
  painel: {
    backgroundColor: CORES.branco, borderRadius: 10, marginTop: 6, padding: 14,
    borderWidth: 1, borderColor: CORES.cinzaClaro, alignItems: 'center',
  },
  dica: { fontSize: 13, color: CORES.textoClaro, marginTop: 10, textAlign: 'center' },

  quadra: {
    backgroundColor: MADEIRA, borderWidth: 2, borderColor: LINHA, borderRadius: 4, overflow: 'hidden',
  },
  linhaQuadra: { flex: 1, flexDirection: 'row' },
  area: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.5)',
  },
  areaSelecionada: { backgroundColor: CORES.sucesso },

  garrafao: {
    position: 'absolute', top: 0, left: '33.3333%', width: '33.3333%', height: '50%',
    borderWidth: 2, borderTopWidth: 0, borderColor: LINHA,
  },
  circuloLance: { position: 'absolute', left: '50%', top: '50%', borderWidth: 2, borderColor: LINHA },
  cesta: {
    position: 'absolute', left: '50%', top: '5%',
    borderWidth: 2, borderColor: CORES.aviso, backgroundColor: CORES.branco,
  },
});