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

const usuario = require(path.join(__dirname, "/routes/usuario.routes.js"));
//<<<<<<< HEAD

app.use("/api/usuario", usuario);
//=======
const inscripcion = require(path.join(__dirname, "/routes/inscripcion.routes.js"));
const proyecto = require(path.join(__dirname, "/routes/proyecto.routes.js"));
const avance = require(path.join(__dirname, "/routes/avance.routes.js"));

app.use("/api/usuario", usuario);
app.use("/api/inscripcion", inscripcion);
app.use("/api/proyecto", proyecto);
app.use("/api/avance", avance);
//>>>>>>> main

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")} `);
});

//practica de jessica 
app.listen(4000,()=>console.log('server on port 4000'));