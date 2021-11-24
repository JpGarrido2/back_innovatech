const mongoose = require("mongoose");
const { Schema } = mongoose;

const EstudiantesSchema = new Schema({
  id_proyecto: { type: Object, required: true },
  nombre_estudiante: { type: String, required: true },
  fecha_ingreso: { type: Date, required: true },
  fecha_egreso: { type: Date, required: true },
  identificacion: { type: Number, required: true },
  
});
module.exports = mongoose.model("", EstudiantesSchema, "estudiantes");
