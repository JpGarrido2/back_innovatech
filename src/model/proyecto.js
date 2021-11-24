const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProyectoSchema = new Schema({

  nombre_proyecto: { type: String, required: true },
  identificacion: { type: Number, required: true },
  presupuesto: { type: Number, required: true },
  estado: { type: string, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_terminacion: { type: Date, required: true },  
  face_proyecto: { type: String, required: true },
  objetivo_general: { type: string, required: true },
  objetivo_especifico: { type: string, required: true },
  id_usuario:{ type: object, required: true },
});
module.exports = mongoose.model("Proyecto", ProyectoSchema, "Proyecto");
