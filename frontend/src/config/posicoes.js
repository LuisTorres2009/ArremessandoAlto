export const POSICOES = [
  { valor: 'lateral_esquerda', label: 'Lateral esquerda' },
  { valor: 'meio', label: 'Garrafão' },
  { valor: 'lateral_direita', label: 'Lateral direita' },
  { valor: 'lateral_esquerda_atras', label: 'Ala esquerda' },
  { valor: 'atras', label: 'Topo' },
  { valor: 'lateral_direita_atras', label: 'Ala direita' },
];

export function nomeDaPosicao(valor) {
  return POSICOES.find((p) => p.valor === valor)?.label || null;
}