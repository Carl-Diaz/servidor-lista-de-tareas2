// const express = require("express");
// const router = express.Router();

// let tasks = [
//   { id: 1, description: "Hacer la compra", completed: false },
//   { id: 2, description: "Lavar la ropa", completed: true },
//   { id: 3, description: "Estudiar para el examen", completed: false },
// ];

// // Ruta para crear una tarea (POST)
// router.post("/", (req, res) => {
//   const newTask = req.body;
//   tasks.push(newTask);
//   res.json(newTask);
// });

// // Ruta para eliminar una tarea por ID (DELETE)
// router.delete("/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   tasks = tasks.filter((task) => task.id !== taskId);
//   res.json({ message: "Tarea eliminada con éxito" });
// });

// // Ruta para actualizar una tarea por ID (PUT)
// router.put("/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const updatedTask = req.body;

//   tasks = tasks.map((task) => {
//     if (task.id === taskId) {
//       return { ...task, ...updatedTask };
//     }
//     return task;
//   });

//   res.json({ message: "Tarea actualizada con éxito" });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, description: "Hacer la compra", completed: false },
  { id: 2, description: "Lavar la ropa", completed: true },
  { id: 3, description: "Estudiar para el examen", completed: false },
];

// Ruta para crear una tarea (POST)
router.post("/", (req, res) => {
  const newTask = req.body;
  // Generar un nuevo ID para la tarea
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  // Mostrar la lista de tareas actualizada después de crear una nueva tarea
  res.json({ message: "Tarea creada con éxito" });
});

// Ruta para eliminar una tarea por ID (DELETE)
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Tarea no encontrada" });
  } else {
    tasks.splice(taskIndex, 1);
    // Mostrar la lista de tareas actualizada después de eliminar una tarea
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
    // Mostrar la lista de tareas actualizada después de actualizar una tarea
    res.json({ message: "Tarea actualizada con éxito" });
  }
});

module.exports = router;
