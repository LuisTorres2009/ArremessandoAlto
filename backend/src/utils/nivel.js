const NIVEIS = ["iniciante", "intermediario", "experiente", "profissional"];

const NOMES = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  experiente: "Experiente",
  profissional: "Profissional",
};


const FAIXAS = {
  intermediario: { aproveitamento: 40, arremessos: 100, minutos: 30 },
  experiente: { aproveitamento: 55, arremessos: 300, minutos: 120 },
  profissional: { aproveitamento: 70, arremessos: 600, minutos: 300 },
};


function criteriosAtingidos(totais, faixa) {
  const tentativas = Number(totais.tentativas) || 0;
  const acertos = Number(totais.acertos) || 0;
  const segundos = Number(totais.segundos) || 0;

  return {

    aproveitamento: tentativas > 0 && acertos * 100 >= faixa.aproveitamento * tentativas,
    arremessos: tentativas >= faixa.arremessos,
    minutos: segundos >= faixa.minutos * 60,
  };
}

function atingiuFaixa(totais, faixa) {
  const c = criteriosAtingidos(totais, faixa);
  return c.aproveitamento && c.arremessos && c.minutos;
}

// Maior nível cujas metas foram todas atingidas
function nivelConquistado(totais) {
  for (let i = NIVEIS.length - 1; i >= 1; i--) {
    if (atingiuFaixa(totais, FAIXAS[NIVEIS[i]])) return NIVEIS[i];
  }
  return NIVEIS[0];
}

function posicaoDoNivel(nivel) {
  return NIVEIS.indexOf(nivel); // -1 se vazio/desconhecido
}

// Nunca rebaixa: devolve o nível que o jogador deve ter (o maior entre o atual e o conquistado)
function nivelAposTreino(nivelAtual, totais) {
  const conquistado = nivelConquistado(totais);
  return posicaoDoNivel(conquistado) > posicaoDoNivel(nivelAtual) ? conquistado : nivelAtual;
}

// Quanto falta para o próximo nível (para mostrar na tela de estatísticas)
function progressoProximoNivel(totais, nivelAtual) {
  // sem nível definido conta como iniciante
  const proximo = NIVEIS[Math.max(0, posicaoDoNivel(nivelAtual)) + 1];
  if (!proximo) return null; // já é profissional (ou nível desconhecido)

  const faixa = FAIXAS[proximo];
  const tentativas = Number(totais.tentativas) || 0;
  const acertos = Number(totais.acertos) || 0;
  const minutos = (Number(totais.segundos) || 0) / 60;
  const aproveitamento = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
  const atingidos = criteriosAtingidos(totais, faixa);

  const limitar = (v) => Math.max(0, Math.min(100, Math.round(v)));

  return {
    nivel: proximo,
    nome: NOMES[proximo],
    criterios: [
      {
        chave: "aproveitamento",
        atual: Math.round(aproveitamento * 10) / 10,
        meta: faixa.aproveitamento,
        concluido: atingidos.aproveitamento,
        progresso: limitar((aproveitamento / faixa.aproveitamento) * 100),
      },
      {
        chave: "arremessos",
        atual: tentativas,
        meta: faixa.arremessos,
        concluido: atingidos.arremessos,
        progresso: limitar((tentativas / faixa.arremessos) * 100),
      },
      {
        chave: "minutos",
        atual: Math.floor(minutos),
        meta: faixa.minutos,
        concluido: atingidos.minutos,
        progresso: limitar((minutos / faixa.minutos) * 100),
      },
    ],
  };
}

module.exports = {
  NIVEIS,
  NOMES,
  FAIXAS,
  nivelConquistado,
  nivelAposTreino,
  progressoProximoNivel,
  posicaoDoNivel,
};