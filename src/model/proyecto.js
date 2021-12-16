const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProyectoSchema = new Schema({
  nombre_proyecto: { type: String, required: true },
  presupuesto: { type: Number, required: true },
  estado: { type: String, required: false },
  fecha_inicio: { type: Date, required: false },
  fecha_terminacion: { type: Date, },
  fase_proyecto: { type: String,required: false  },
  objetivo_general: { type: String, required: true },
  objetivo_especifico: { type: String, required: true },
  id_usuario: [{ type: mongoose.Types.ObjectId, required: true, ref: "Usuario" }],
});
module.exports = mongoose.model("Proyecto", ProyectoSchema, "proyecto");
