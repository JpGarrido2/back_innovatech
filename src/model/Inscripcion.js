const mongoose = require("mongoose");
const { Schema } = mongoose;

const InscripcionSchema = new Schema({
  id_proyecto: { type: object, required: true },
  id_usuario: { type: object, required: true },
  estado: { type: boolean, required: true },
  fecha_ingreso:{type: Date, required:true},
  fecha_egreso:{type: Date, required:true},

  token: { type: String, required: false },
});
module.exports = mongoose.model("", InscripcionSchema, "inscripcion");
