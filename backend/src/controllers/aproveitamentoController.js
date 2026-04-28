const db = require("../config/db");

async function registrarAproveitamento(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { tentativas, acertos, tempo, id_tabelabasquete, id_aula } = req.body;
 
  if (!tentativas || acertos === undefined) {
    return res.status(400).json({ mensagem: "Tentativas e acertos são obrigatórios." });
  }
 
  const aproveitamento = tentativas > 0 ? ((acertos / tentativas) * 100).toFixed(2) : 0;
 
  try {
    await db.query(
      `INSERT INTO RegistroAproveitamento (tentativas, acertos, aproveitamento, tempo, id_tabelabasquete, id_jogador, id_aula)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [tentativas, acertos, aproveitamento, tempo || null, id_tabelabasquete || null, id_jogador, id_aula || null]
    );
 
    return res.status(201).json({
      mensagem: "Aproveitamento registrado!",
      aproveitamento: `${aproveitamento}%`,
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
        a.numero_aula,
        a.semana,
        a.dia
      FROM RegistroAproveitamento ra
      LEFT JOIN Aulas a ON ra.id_aula = a.id_aula
      WHERE ra.id_jogador = ?
      ORDER BY ra.id_reg_aprov DESC`,
      [id_jogador]
    );
 
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar histórico:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function mediaAproveitamentoPorAula(req, res) {
  const { id_aula } = req.params;
 
  try {
    const [rows] = await db.query("CALL CalcularMediaAproveitamentoJogadores(?)", [
      id_aula,
    ]);
 
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao calcular média:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function rankingJogadores(req, res) {
  try {
    const [rows] = await db.query("CALL MelhorAproveitamentoJogadores()");
 
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function resetarAproveitamento(req, res) {
  const id_jogador = req.jogador.id_jogador;
 
  try {
    await db.query("CALL ResetarAproveitamentoJogador(?)", [id_jogador]);
 
    return res.status(200).json({ mensagem: "Aproveitamento resetado com sucesso." });
  } catch (error) {
    console.error("Erro ao resetar aproveitamento:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
module.exports = {
  registrarAproveitamento,
  listarHistorico,
  mediaAproveitamentoPorAula,
  rankingJogadores,
  resetarAproveitamento,
};