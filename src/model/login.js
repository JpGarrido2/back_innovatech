const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoginSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  rol: { type: String, required: true, trim: true },
  estado: { type: Number, required: true, trim: true },
  identificacion: { type: Number, required: true, trim: true },
  contrasena: { type: String, required: true, trim: true },
  token: { type: String, required: false },
});
module.exports = mongoose.model("login", LoginSchema, "login");
