const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  registrarAproveitamento,
  listarHistorico,
  mediaAproveitamentoPorAula,
  rankingJogadores,
  resetarAproveitamento,
} = require("../controllers/aproveitamentoController");
 
router.post("/", auth, registrarAproveitamento);                  // POST /aproveitamento
router.get("/historico", auth, listarHistorico);                  // GET  /aproveitamento/historico
router.get("/ranking", auth, rankingJogadores);                   // GET  /aproveitamento/ranking
router.get("/media/:id_aula", auth, mediaAproveitamentoPorAula);  // GET  /aproveitamento/media/2
router.put("/resetar", auth, resetarAproveitamento);              // PUT  /aproveitamento/resetar
 
module.exports = router;