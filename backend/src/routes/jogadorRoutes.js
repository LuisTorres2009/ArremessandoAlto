const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  buscarPerfil,
  atualizarPerfil,
  atualizarExperiencia,
  deletarJogador,
} = require("../controllers/jogadorController");
 
router.get("/perfil", auth, buscarPerfil);
router.put("/perfil", auth, atualizarPerfil);
router.put("/experiencia", auth, atualizarExperiencia);
router.delete("/", auth, deletarJogador);
 
module.exports = router;