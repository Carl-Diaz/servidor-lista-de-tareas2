const tasks = require("../script");
const express = require("express");
const router = express.Router();

// Ruta para crear una tarea (POST)
router.post("/", (req, res, next) => {
  const newTask = req.body;

  // Verifica si "description" y "completed" están presentes en el cuerpo de la solicitud
  if (!newTask || !newTask.description || !newTask.completed) {
    next(new Error("Cuerpo vacío o atributos faltantes"));
  } else {
    // Agrega el "id" arriba en el objeto
    newTask.id = tasks.length + 1;

    // Agrega la nueva tarea a la lista
    tasks.push(newTask);
    res.json({ message: "Tarea creada con éxito", task: newTask });
  }
});

// Ruta para actualizar una tarea por ID (PUT)
router.put("/:id", (req, res, next) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Tarea no encontrada" });
  } else {
    const updatedTask = req.body;

    // Verifica si "description" y "completed" están presentes en el cuerpo de la solicitud
    if (!updatedTask || !updatedTask.description || !updatedTask.completed) {
      next(new Error("Cuerpo vacío o atributos faltantes"));
    } else {
      // Agrega el "id" arriba en el objeto
      updatedTask.id = taskId;

      // Actualiza la tarea en la lista
      tasks[taskIndex] = updatedTask;
      res.json({ message: "Tarea actualizada con éxito" });
    }
  }
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

// Middleware para manejar errores
router.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

module.exports = router;
