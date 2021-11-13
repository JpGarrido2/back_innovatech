const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { mongoose } = require("./database");
// crear el servidor
const app = express();

// configuraciones
app.set("port", process.env.PORT || 4000);

// Middlewares

app.use(morgan("dev"));
app.use(express.json());

const login = require(path.join(__dirname, "/routes/login.routes.js"));

app.use("/api/login", login);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")} `);
});
