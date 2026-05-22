const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { buscarPerfil, atualizarPerfil, atualizarExperiencia } = require("../controllers/jogadorController");

router.get("/perfil", auth, buscarPerfil);
router.put("/perfil", auth, atualizarPerfil);
router.put("/experiencia", auth, atualizarExperiencia);

module.exports = router;