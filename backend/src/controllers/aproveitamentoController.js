const db = require("../config/db");
const { POSICOES, calcularEstatisticas } = require("../utils/estatisticas");
const { NOMES, nivelAposTreino, progressoProximoNivel, posicaoDoNivel } = require("../utils/nivel.js");

async function estatisticasDoJogador(id_jogador) {
  const [rows] = await db.query(
    `SELECT tentativas, acertos, tempo, posicao
     FROM RegistroAproveitamento
     WHERE id_jogador = ?`,
    [id_jogador]
  );
  return calcularEstatisticas(rows);
}

function totaisDoNivel(estatisticas) {
  return {
    tentativas: estatisticas.geral.tentativas,
    acertos: estatisticas.geral.acertos,
    segundos: estatisticas.tempoTotalSegundos,
  };
}


async function atualizarNivelJogador(id_jogador, estatisticas) {
  const [linhas] = await db.query(
    `SELECT e.exp_basq
     FROM Jogador j
     LEFT JOIN ExperienciaBasquete e ON j.id_exp_basq = e.id_exp_basq
     WHERE j.id_jogador = ?`,
    [id_jogador]
  );
  const nivelAtual = linhas[0]?.exp_basq || null;
  const totais = totaisDoNivel(estatisticas);
  const novoNivel = nivelAposTreino(nivelAtual, totais);

  // posicaoDoNivel >= 1: não grava "iniciante" para quem ainda nem escolheu o nível
  if (novoNivel !== nivelAtual && posicaoDoNivel(novoNivel) >= 1) {
    await db.query("CALL AtualizarExperienciaJogador(?, ?)", [id_jogador, novoNivel]);
    return { nivel: novoNivel, subiu: true, totais };
  }
  return { nivel: nivelAtual, subiu: false, totais };
}

async function registrarAproveitamento(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { tentativas, acertos, tempo, id_aula, titulo, posicao } = req.body;

  if (tentativas === undefined || acertos === undefined) {
    return res.status(400).json({ mensagem: "Tentativas e acertos são obrigatórios." });
  }

  // posição é opcional, mas se vier precisa ser uma das válidas
  if (posicao && !POSICOES.includes(posicao)) {
    return res.status(400).json({ mensagem: "Posição de arremesso inválida." });
  }

  const aproveitamento = tentativas > 0
    ? ((acertos / tentativas) * 100).toFixed(2)
    : 0;

  const tituloFinal = (titulo || "Treino Livre").trim() || "Treino Livre";

  try {
    await db.query(
      `INSERT INTO RegistroAproveitamento
        (tentativas, acertos, aproveitamento, tempo, id_jogador, id_aula, titulo, posicao)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tentativas,
        acertos,
        aproveitamento,
        tempo || null,
        id_jogador,
        id_aula || null,
        tituloFinal,
        posicao || null,
      ]
    );

    // Atualiza o nível do jogador. Se falhar, o treino já foi salvo e segue valendo.
    let nivel = null;
    try {
      const resultado = await atualizarNivelJogador(id_jogador, await estatisticasDoJogador(id_jogador));
      nivel = {
        atual: resultado.nivel,
        nome: NOMES[resultado.nivel] || null,
        subiu: resultado.subiu,
      };
    } catch (erroNivel) {
      console.error("Erro ao atualizar nível do jogador:", erroNivel);
    }

    return res.status(201).json({
      mensagem: "Aproveitamento registrado!",
      aproveitamento: `${aproveitamento}%`,
      nivel,
    });
  } catch (error) {
    console.error("Erro ao registrar aproveitamento:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function listarHistorico(req, res) {
  const id_jogador = req.jogador.id_jogador;

  try {
    const [rows] = await db.query(
      `SELECT
        ra.id_reg_aprov,
        ra.tentativas,
        ra.acertos,
        ra.aproveitamento,
        ra.tempo,
        ra.titulo,
        ra.posicao,
        ra.data_registro,
        a.numero_aula,
        a.semana,
        a.dia
       FROM RegistroAproveitamento ra
       LEFT JOIN Aulas a ON ra.id_aula = a.id_aula
       WHERE ra.id_jogador = ?
       ORDER BY ra.data_registro DESC`,
      [id_jogador]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar histórico:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function buscarEstatisticas(req, res) {
  const id_jogador = req.jogador.id_jogador;

  try {
    const estatisticas = await estatisticasDoJogador(id_jogador);

    // Também confere o nível aqui, para quem já tinha treinos antes desta regra existir
    const { nivel, totais } = await atualizarNivelJogador(id_jogador, estatisticas);

    return res.status(200).json({
      ...estatisticas,
      nivel: {
        atual: nivel,
        nome: NOMES[nivel] || null,
        proximo: progressoProximoNivel(totais, nivel),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

module.exports = { registrarAproveitamento, listarHistorico, buscarEstatisticas };