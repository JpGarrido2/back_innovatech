const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoginSchema = new Schema({
  identificacion: { type: Number, required: true },
  nombre_estudiante: { type: String, required: true },
  estado: { type: String, required: true },
  fecha_ingreso: { type: Number, required: true },
  fecha_egreso: { type: Number, required: true },
  id_proyecto: { type: String, required: true },
});
module.exports = mongoose.model("", LoginSchema, "login");
