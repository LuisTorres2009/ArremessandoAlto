const db = require("../config/db");

async function listarAulasPorSemana(req, res) {
  const { semana } = req.query;

  if (!semana) {
    return res.status(400).json({ mensagem: "Informe o número da semana." });
  }

  try {
    const [rows] = await db.query(
      `SELECT id_aula, semana, dia, numero_aula, titulo, explicacao, pratica, youtube_id
       FROM Aulas
       WHERE semana = ?
       ORDER BY dia, numero_aula`,
      [semana]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function buscarAula(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT id_aula, semana, dia, numero_aula, titulo, explicacao, pratica, youtube_id
       FROM Aulas WHERE id_aula = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Aula não encontrada." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function adicionarAula(req, res) {
  const { semana, dia, numero_aula, titulo, explicacao, pratica, youtube_id } = req.body;

  if (!semana || !dia || !numero_aula) {
    return res.status(400).json({ mensagem: "Semana, dia e número da aula são obrigatórios." });
  }

  if (youtube_id && (youtube_id.length < 10 || youtube_id.length > 12)) {
    return res.status(400).json({ mensagem: "youtube_id inválido. Use só o código do vídeo (ex: dQw4w9WgXcQ)." });
  }

  try {
    await db.query("CALL AdicionarAula(?, ?, ?, ?, ?, ?, ?)", [
      semana,
      dia,
      numero_aula,
      titulo || null,
      explicacao || null,
      pratica || false,
      youtube_id || null,
    ]);

    return res.status(201).json({ mensagem: "Aula adicionada com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function atualizarAula(req, res) {
  const { id } = req.params;
  const { titulo, explicacao, youtube_id } = req.body;

  if (youtube_id && (youtube_id.length < 10 || youtube_id.length > 12)) {
    return res.status(400).json({ mensagem: "youtube_id inválido. Use só o código do vídeo (ex: dQw4w9WgXcQ)." });
  }

  try {
    await db.query("CALL AlterarAula(?, ?, ?, ?)", [
      id,
      titulo || null,
      explicacao || null,
      youtube_id || null,
    ]);

    return res.status(200).json({ mensagem: "Aula atualizada com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function listarAulasNaoPraticadas(req, res) {
  const id_jogador = req.jogador.id_jogador;

  try {
    const [rows] = await db.query("CALL ListarAulasNaoPraticadasPorJogador(?)", [id_jogador]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function buscarProgresso(req, res) {
  const id_jogador = req.jogador.id_jogador;

  try {
    const [rows] = await db.query("CALL ListarProgressoJogador(?)", [id_jogador]);
    return res.status(200).json(rows[0][0] || {});
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function atualizarProgresso(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { semana_ult_aula, dia_ult_aula, ult_aula_realizada } = req.body;

  try {
    const [jogador] = await db.query(
      "SELECT id_prog_aula FROM Jogador WHERE id_jogador = ?",
      [id_jogador]
    );

    if (jogador.length === 0) {
      return res.status(404).json({ mensagem: "Jogador não encontrado." });
    }

    await db.query(
      `UPDATE ProgressoAula
       SET semana_ult_aula = ?, dia_ult_aula = ?, ult_aula_realizada = ?
       WHERE id_prog_aula = ?`,
      [semana_ult_aula, dia_ult_aula, ult_aula_realizada, jogador[0].id_prog_aula]
    );

    return res.status(200).json({ mensagem: "Progresso atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

module.exports = {
  listarAulasPorSemana,
  buscarAula,
  adicionarAula,
  atualizarAula,
  listarAulasNaoPraticadas,
  buscarProgresso,
  atualizarProgresso,
};