const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Middleware para verificar el token en rutas protegidas
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

    // Verifica que el token sea válido y que la marca de tiempo sea reciente
    if (decoded.iat > currentTime - 3600) {
      // Considera válido si es de la última hora
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Token expirado" });
    }
  });
}

// Ruta protegida
router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Ruta protegida alcanzada", user: req.user });
});

module.exports = router;
