const mongoose = require("mongoose");
const { Schema } = mongoose;

const InscripcionSchema = new Schema({
  id_proyecto: { type: Object, required: true },
  id_usuario: { type: Object, required: true },
  estado: { type: String, required: true },
  fecha_ingreso: { type: Date, required: true },
  fecha_egreso: { type: Date, required: true },

  token: { type: String, required: false },
});
module.exports = mongoose.model("", InscripcionSchema, "inscripcion");
