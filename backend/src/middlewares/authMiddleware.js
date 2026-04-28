const jwt = require("jsonwebtoken");
require("dotenv").config();
 
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
 
  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }
 
  const token = authHeader.split(" ")[1];
 
  if (!token) {
    return res.status(401).json({ mensagem: "Token inválido." });
  }
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    req.jogador = decoded;
 
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Token expirado ou inválido." });
  }
}
 
module.exports = authMiddleware;