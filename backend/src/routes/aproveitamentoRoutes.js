const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { registrarAproveitamento, listarHistorico, buscarEstatisticas } = require("../controllers/aproveitamentoController");
 
router.post("/", auth, registrarAproveitamento);
router.get("/historico", auth, listarHistorico);
router.get("/estatisticas", auth, buscarEstatisticas);
 
module.exports = router;