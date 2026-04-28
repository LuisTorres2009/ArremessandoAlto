const express = require("express");
const cors = require("cors");
require("dotenv").config();
 
const authRoutes = require("./routes/authRoutes");
const jogadorRoutes = require("./routes/jogadorRoutes");
const aulasRoutes = require("./routes/aulasRoutes");
const aproveitamentoRoutes = require("./routes/aproveitamentoRoutes");
const objetivosRoutes = require("./routes/objetivosRoutes");
 
const app = express();
 
app.use(cors());
 
app.use(express.json());
 
app.get("/", (req, res) => {
  res.json({ mensagem: "API Arremessando Alto está funcionando! 🏀" });
});
 
app.use("/auth", authRoutes);              
app.use("/jogador", jogadorRoutes);        
app.use("/aulas", aulasRoutes);            
app.use("/aproveitamento", aproveitamentoRoutes); 
app.use("/objetivos", objetivosRoutes);     
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
});