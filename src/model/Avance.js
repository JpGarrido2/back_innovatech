const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvanceSchema = new Schema({
  
    id_proyecto: { type: Object, required: true },
    fecha_avances: { type: Date, required: true },
    descripcion: { type: string, required: true },
    observacion: { type: array, required: true },
    id_usuario: { type: Object, required: true },
});
module.exports = mongoose.model("", AvancesSchema, "avance");
