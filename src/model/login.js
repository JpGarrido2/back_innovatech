const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoginSchema = new Schema({
  email: { type: String, required: true },
  identificacion: { type: Number, required: true },
  nombre_completo: { type: String, required: true },
  contrasena: { type: String, required: true },
  tipo_usuario: { type: Number, required: true },
  estado: { type: Number, required: true },
  token: { type: String, required: false },
});
module.exports = mongoose.model("Login", LoginSchema, "login");
