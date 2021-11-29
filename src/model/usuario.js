const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  email: { type: String, required: true },
  identificacion: { type: Number, required: true },
  nombre_completo: { type: String, required: true },
  fecha_ingreso: { type: Date, required: true },
  fecha_egreso: { type: Date, required: true },
  password: { type: String, required: true },
  tipo_usuario: { type: String, required: true },
  estado: { type: String, required: true },
});
module.exports = mongoose.model("Usuario", UsuarioSchema, "usuario");
