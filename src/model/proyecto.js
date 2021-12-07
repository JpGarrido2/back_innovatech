const mongoose = require("mongoose");
const { Schema } = mongoose;
const Autor = mongoose.model("Usuario");

const LoginSchema = new Schema({
  nombre_proyecto: { type: String, required: true },
  presupuesto: { type: Number, required: true },
  estado: { type: String, required: false },
  fecha_inicio: { type: Date, required: false },
  fecha_terminacion: { type: Date, },
  face_proyecto: { type: String,required: false  },
  objetivo_general: { type: String, required: true },
  objetivo_especifico: { type: [], required: true },
  presupuesto: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_terminacion: { type: Date, required: true },
  id_usuario: { type: Schema.ObjectId, ref: "Usuario" },
  estado: {},
  fase_proyecto: {},
});
module.exports = mongoose.model("Login", LoginSchema, "login");
