const mongoose = require("mongoose");
const { Schema } = mongoose;

const EstudianteSchema = new Schema({
  identificacion: { type: Number, required: true },
  nombre_estudiante: { type: String, required: true },
  fecha_ingreso: { type: Date, required: true },
  fecha_egreso: { type: Date, required: true },
  id_proyecto: { type: String, required: true },
});
module.exports = mongoose.model("estudiantes", EstudianteSchema, "estudiantes");
