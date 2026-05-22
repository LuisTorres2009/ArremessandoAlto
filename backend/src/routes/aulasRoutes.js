const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { listarAulasPorSemana, buscarProgresso, atualizarProgresso } = require("../controllers/aulasController");

router.get("/", auth, listarAulasPorSemana);
router.get("/progresso", auth, buscarProgresso);
router.put("/progresso", auth, atualizarProgresso);

module.exports = router;