const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

// Middleware para validar métodos HTTP
app.use((req, res, next) => {
  if (
    req.method !== "GET" &&
    req.method !== "POST" &&
    req.method !== "PUT" &&
    req.method !== "DELETE"
  ) {
    res.status(400).json({ error: "Método HTTP no válido" });
  } else {
    next();
  }
});

const listViewRouter = require("./Routers/list-view-router");
const listEditRouter = require("./Routers/list-edit-router");

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
