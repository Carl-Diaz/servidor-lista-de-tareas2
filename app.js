const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const listViewRouter = require("./Routers/list-view-router");
const listEditRouter = require("./Routers/list-edit-router");

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
