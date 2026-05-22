const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { registrarAproveitamento, listarHistorico } = require("../controllers/aproveitamentoController");
 
router.post("/", auth, registrarAproveitamento);
router.get("/historico", auth, listarHistorico);
 
module.exports = router;