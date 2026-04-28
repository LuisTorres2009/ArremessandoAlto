const db = require("../config/db");
 
async function buscarPerfil(req, res) {
  const id_jogador = req.jogador.id_jogador;
 
  try {
    const [rows] = await db.query(
      `SELECT 
        j.id_jogador,
        j.nome,
        j.email,
        j.data_nascimento,
        p.posicao,
        e.exp_basq
      FROM Jogador j
      LEFT JOIN Posicoes p ON j.id_posicao = p.id_posicao
      LEFT JOIN ExperienciaBasquete e ON j.id_exp_basq = e.id_exp_basq
      WHERE j.id_jogador = ?`,
      [id_jogador]
    );
 
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Jogador não encontrado." });
    }
 
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function atualizarPerfil(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { nome, email, data_nascimento } = req.body;
 
  try {
    await db.query("CALL AtualizarDadosJogador(?, ?, ?, ?)", [
      id_jogador,
      nome,
      email,
      data_nascimento || null,
    ]);
 
    return res.status(200).json({ mensagem: "Perfil atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function atualizarExperiencia(req, res) {
  const id_jogador = req.jogador.id_jogador;
  const { exp_basq } = req.body;
 
  const valoresValidos = ["iniciante", "intermediario", "experiente", "profissional"];
 
  if (!valoresValidos.includes(exp_basq)) {
    return res.status(400).json({ mensagem: "Experiência inválida." });
  }
 
  try {
    await db.query("CALL AtualizarExperienciaJogador(?, ?)", [id_jogador, exp_basq]);
 
    return res.status(200).json({ mensagem: "Experiência atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar experiência:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
async function deletarJogador(req, res) {
  const id_jogador = req.jogador.id_jogador;
 
  try {
    await db.query("CALL ExcluirJogador(?)", [id_jogador]);
 
    return res.status(200).json({ mensagem: "Conta deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar jogador:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}
 
module.exports = { buscarPerfil, atualizarPerfil, atualizarExperiencia, deletarJogador };