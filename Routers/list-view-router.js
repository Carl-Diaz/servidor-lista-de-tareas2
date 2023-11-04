const tasks = require("../script");
const express = require("express");
const router = express.Router();

// Middleware para validar parámetros
const validationTasks = (req, res, next) => {
  const validationById = req.params.id;
  if (!tasks.some((task) => task.id === parseInt(validationById))) {
    res.status(404).json({ error: "ID no valido" });
  } else {
    next();
  }
};

// Ruta para listar todas las tareas
router.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Ruta para lista una tarea por ID
router.get("/tasks/:id", validationTasks, (req, res) => {
  const getById = req.params.id;
  const findId = tasks.find((task) => task.id === parseInt(getById));
  res.json({ message: "Tarea encontrada con exito", task: findId });
});

// Ruta para listar tareas completas
router.get("/tasks/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.json(completedTasks);
});

// Ruta para listar tareas incompletas
router.get("/tasks/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
