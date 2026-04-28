const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  listarAulasPorSemana,
  buscarAula,
  adicionarAula,
  atualizarAula,
  listarAulasNaoPraticadas,
  buscarProgresso,
  atualizarProgresso,
} = require("../controllers/aulasController");
 
router.get("/", auth, listarAulasPorSemana);              // GET  /aulas?semana=1
router.get("/progresso", auth, buscarProgresso);          // GET  /aulas/progresso
router.get("/nao-praticadas", auth, listarAulasNaoPraticadas); // GET /aulas/nao-praticadas
router.get("/:id", auth, buscarAula);                     // GET  /aulas/3
router.post("/", auth, adicionarAula);                    // POST /aulas
router.put("/progresso", auth, atualizarProgresso);       // PUT  /aulas/progresso
router.put("/:id", auth, atualizarAula);                  // PUT  /aulas/3
 
module.exports = router;