const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvanceSchema = new Schema({
  id_proyecto: 
    [{ type: mongoose.Types.ObjectId, ref: "Proyecto", required: true }],

  fecha_avances: { type: Date, required: false },
  descripcion: { type: String, required: true },
  observacion: { type: Array, required: true },
  id_usuario: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
});
module.exports = mongoose.model("Avance", AvanceSchema, "avance");
