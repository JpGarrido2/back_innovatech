const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvanceSchema = new Schema({
  id_proyecto: { type: String, required: true },
  fecha_avances: { type: Date, required: false },
  descripcion: { type: String, required: true },
  observacion: { type: Array, required: true },
  id_usuario: { type: String, required: true },
});
module.exports = mongoose.model("Avance", AvanceSchema, "avance");
