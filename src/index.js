const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { mongoose } = require("./database");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

//Variables de entorno
dotenv.config();

// crear el servidor
const app = express();

// configuraciones
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

const login = require(path.join(__dirname, "/routes/login.routes.js"));
const estudiantes = require(path.join(
  __dirname,
  "/routes/estudiantes.routes.js"
));

app.use("/api/login", login);
app.use("/api/estudiantes", estudiantes);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")} `);
});
