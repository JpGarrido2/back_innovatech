const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { mongoose } = require("./database");
const cors = require("cors");
const bodyparser = require("body-parser");
var cookieParser = require("cookie-parser");

// crear el servidor
const app = express();

// configuraciones
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

const usuario = require(path.join(__dirname, "/routes/usuario.routes.js"));
const inscripcion = require(path.join(__dirname, "/routes/inscripcion.routes.js"));
const proyecto = require(path.join(__dirname, "/routes/proyecto.routes.js"));
const avance = require(path.join(__dirname, "/routes/avance.routes.js"));

app.use("/api/usuario", usuario);
app.use("/api/inscripcion", inscripcion);
app.use("/api/proyecto", proyecto);
app.use("/api/avance", avance);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")} `);
});
