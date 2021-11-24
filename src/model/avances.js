const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvancesSchema = new Schema({
  
    id_proyecto: { type: Object, required: true },
    fecha_avances: { type: Date, required: true },
    descripcion: { type: string, required: true },
});
module.exports = mongoose.model("", AvancesSchema, "avances");
