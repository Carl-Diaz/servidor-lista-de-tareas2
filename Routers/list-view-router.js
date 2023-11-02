const tasks = require("../script");
const express = require("express");
const router = express.Router();

// Ruta para listar todas las tareas
router.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Ruta para listar tareas completas
router.get("/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.json(completedTasks);
});

// Ruta para listar tareas incompletas
router.get("/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
