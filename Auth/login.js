const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Define un array de usuarios con nombres de usuario y contraseñas
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
  { username: "user4", password: "password4" },
];

// Ruta de autenticación (login)
router.post("/", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const currentTime = Math.floor(Date.now() / 10000); // 10000 milisegundos = 10 segundos
  const tokenPayload = {
    id: user.id,
    username: user.username,
    iat: currentTime,
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;
