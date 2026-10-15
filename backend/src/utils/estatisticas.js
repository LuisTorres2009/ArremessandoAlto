// Posições de arremesso aceitas (mesmos valores do ENUM da coluna RegistroAproveitamento.posicao)
const POSICOES = [
  "lateral_esquerda",
  "meio",
  "lateral_direita",
  "lateral_esquerda_atras",
  "atras",
  "lateral_direita_atras",
];

// "5:30" -> 330 segundos (formato salvo pelo app). Retorna null se inválido.
function tempoParaSegundos(tempo) {
  if (!tempo) return null;
  const partes = /^(\d+):(\d{2})$/.exec(String(tempo).trim());
  if (!partes) return null;
  return Number(partes[1]) * 60 + Number(partes[2]);
}

function porcentagem(acertos, tentativas) {
  if (!tentativas) return null;
  return Math.round((acertos / tentativas) * 1000) / 10; // 1 casa decimal
}

// registros: [{ tentativas, acertos, tempo, posicao }] de um jogador
function calcularEstatisticas(registros) {
  const geral = { treinos: registros.length, tentativas: 0, acertos: 0 };
  const porPosicao = Object.fromEntries(
    POSICOES.map((p) => [p, { posicao: p, treinos: 0, tentativas: 0, acertos: 0 }])
  );

  let somaSegundos = 0;
  let treinosComTempo = 0;
  let tentativasComTempo = 0;

  for (const r of registros) {
    const tentativas = Number(r.tentativas) || 0;
    const acertos = Number(r.acertos) || 0;

    geral.tentativas += tentativas;
    geral.acertos += acertos;

    const pos = porPosicao[r.posicao];
    if (pos) {
      pos.treinos += 1;
      pos.tentativas += tentativas;
      pos.acertos += acertos;
    }

    const segundos = tempoParaSegundos(r.tempo);
    if (segundos && segundos > 0) {
      somaSegundos += segundos;
      treinosComTempo += 1;
      tentativasComTempo += tentativas;
    }
  }

  return {
    geral: { ...geral, aproveitamento: porcentagem(geral.acertos, geral.tentativas) },
    porPosicao: POSICOES.map((p) => ({
      ...porPosicao[p],
      aproveitamento: porcentagem(porPosicao[p].acertos, porPosicao[p].tentativas),
    })),
    // média de duração dos treinos, em segundos (null se nenhum treino tem tempo)
    mediaTempoSegundos: treinosComTempo ? Math.round(somaSegundos / treinosComTempo) : null,
    // arremessos por minuto, ponderado (total de arremessos / total de minutos)
    arremessosPorMinuto: somaSegundos
      ? Math.round((tentativasComTempo / (somaSegundos / 60)) * 10) / 10
      : null,
  };
}

module.exports = { POSICOES, calcularEstatisticas, tempoParaSegundos };
