const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoginSchema = new Schema({
  correo: { type: String, required: true },
  identificacion: { type: Number, required: true },
  nombre_completo: { type: String, required: true },
  password: { type: String, required: true },
  tipo_usuario: { type: Number, required: true },
  estado: { type: Number, required: true },
});
module.exports = mongoose.model("", LoginSchema, "login");
