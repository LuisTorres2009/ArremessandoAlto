const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  listarObjetivos,
  criarObjetivo,
  atualizarStatusObjetivo,
  listarPendentes,
} = require("../controllers/objetivosController");
 
router.get("/", auth, listarObjetivos);                              // GET  /objetivos
router.post("/", auth, criarObjetivo);                               // POST /objetivos
router.get("/pendentes", auth, listarPendentes);                     // GET  /objetivos/pendentes
router.put("/:id_objetivo/status", auth, atualizarStatusObjetivo);  // PUT  /objetivos/5/status
 
module.exports = router;