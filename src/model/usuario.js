const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoginSchema = new Schema({
  nombre_completo: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  tipo_usuario: { type: String, required: true, trim: true },
  estado: { type: String, required: true, trim: true },
  identificacion: { type: Number, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  token: { type: String, required: false },
});
module.exports = mongoose.model("usuario", LoginSchema, "usuario");
