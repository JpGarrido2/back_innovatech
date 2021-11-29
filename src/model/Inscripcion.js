const mongoose = require("mongoose");
const { Schema } = mongoose;

const InscripcionSchema = new Schema({
  id_proyecto: { type: mongoose.Types.ObjectId,  required: true, ref: 'Proyecto' },
  id_usuario: { type: mongoose.Types.ObjectId, required: true, ref: 'Usuario'},
  estado: { type: String, required: true },
  fecha_ingreso: { type: Date, required: false },
  fecha_egreso: { type: Date, required: false },

  token: { type: String, required: false },
});
module.exports = mongoose.model("Inscripcion", InscripcionSchema, "inscripcion");
