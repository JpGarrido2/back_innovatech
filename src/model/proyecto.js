const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProyectoSchema = new Schema({
  nombre_proyecto: { type: String, required: true },
  identificacion: { type: Number, required: true },
  presupuesto: { type: Number, required: true },
  estado: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_terminacion: { type: Date, required: true },
  face_proyecto: { type: String, required: true },
  objetivo_general: { type: String, required: true },
  objetivo_especifico: { type: String, required: true },
  id_usuario: { type: Object, required: true },
});
module.exports = mongoose.model("Proyecto", ProyectoSchema, "Proyecto");
