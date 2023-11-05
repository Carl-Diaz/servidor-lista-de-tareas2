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

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Expiración del token: 1 hora
    }
  );

  res.json({ token });
});
module.exports = router;
