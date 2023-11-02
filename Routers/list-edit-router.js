const tasks = require("../script");
const express = require("express");
const router = express.Router();

// Ruta para crear una tarea (POST)
router.post("/", (req, res) => {
  const newTask = req.body;
  // Generar un nuevo ID para la tarea
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.json({ message: "Tarea creada con éxito", task: newTask });
});

// Ruta para eliminar una tarea por ID (DELETE)
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Tarea no encontrada" });
  } else {
    tasks.splice(taskIndex, 1);
    res.json({ message: "Tarea eliminada con éxito" });
  }
});

// Ruta para actualizar una tarea por ID (PUT)
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Tarea no encontrada" });
  } else {
    const updatedTask = req.body;
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json({ message: "Tarea actualizada con éxito" });
  }
});

module.exports = router;
