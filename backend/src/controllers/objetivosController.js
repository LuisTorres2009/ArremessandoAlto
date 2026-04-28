const db = require("../config/db");
 
async function listarObjetivos(req, res) {
  const id_jogador = req.jogador.id_jogador;
 
  try {
    const [rows] = await db.query("CALL ListarObjetivosJogador(?)", [id_jogador]);
 
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao listar objetivos:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

async function criarObjetivo(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { descricao, tempo_treino_desejado, p_cent_de_arremesso_desejada } = req.body;
 
  if (!tempo_treino_desejado || !p_cent_de_arremesso_desejada) {
    return res.status(400).json({
      mensagem: "Tempo de treino desejado e porcentagem de arremesso são obrigatórios.",
    });
  }
 
  try {
    const [resultado] = await db.query(
      `INSERT INTO Objetivos (descricao, tempo_treino_desejado, p_cent_de_arremesso_desejada)
       VALUES (?, ?, ?)`,
      [descricao || null, tempo_treino_desejado, p_cent_de_arremesso_desejada]
    );
 
    const id_objetivo = resultado.insertId;
 
    await db.query("CALL AdicionarRegistroObjetivo(?, ?)", [id_jogador, id_objetivo]);
 
    return res.status(201).json({ mensagem: "Objetivo criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar objetivo:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function atualizarStatusObjetivo(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { id_objetivo } = req.params;
  const { status } = req.body;
 
  if (!["pendente", "concluido"].includes(status)) {
    return res.status(400).json({ mensagem: "Status inválido. Use 'pendente' ou 'concluido'." });
  }
 
  try {
    const [registro] = await db.query(
      "SELECT id_registro_obj FROM RegistroObj WHERE id_jogador = ? AND id_objetivos = ?",
      [id_jogador, id_objetivo]
    );
 
    if (registro.length === 0) {
      return res.status(404).json({ mensagem: "Objetivo não encontrado para este jogador." });
    }
 
    await db.query(
      "UPDATE RegistroObj SET status = ? WHERE id_jogador = ? AND id_objetivos = ?",
      [status, id_jogador, id_objetivo]
    );
 
    return res.status(200).json({ mensagem: "Status atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function listarPendentes(req, res) {
  try {
    const [rows] = await db.query("CALL ListarJogadoresComObjetivosPendentes()");
 
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao listar pendentes:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
module.exports = { listarObjetivos, criarObjetivo, atualizarStatusObjetivo, listarPendentes };