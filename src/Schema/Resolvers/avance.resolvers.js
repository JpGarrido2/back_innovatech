const Avance = require("../../model/Avance");
const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("en");

const mapearInput = async (input) => {
  input.id_proyecto = mongoose.Types.ObjectId(input.id_proyecto);
  input.id_usuario = mongoose.Types.ObjectId(input.id_usuario);
  input.observacion= (input.observacion)
  input.tipo_usuario = "lider";
  return input;
};
module.exports.resolversAvance = {

  crearAvance: async ({ input }) => {
    const _avance = new Avance(await mapearInput({ ...input }));
    console.log(_avance)
    return await _avance.save();  
  },

  listarAvances: async () => {
    return await Avance.find();
  },

  eliminarAvancePorID: async ({ _id }) => {
    return await Avance.findByIdAndDelete({ _id });
  },
 
  agregarObservacionPorID: async ({ _id ,  input})=>{
    const _avance = await Avance.findById({ _id })
    const _observacion = _avance.observacion
    const avance = await Avance.findByIdAndUpdate({ _id }, {observacion:[..._observacion, input]})
    console.log(_observacion)
    return avance
  },

 
   
}

// crearObservacion: async ({ input }) => {
//   const _observacion= new observacion(await mapearInput({ ...input }));    
//   return await _observacion.save();
// },

// crearDescripcion: async ({ input }) => {
//   const _descripcion= new descripcion(await mapearInput({ ...input }));    
//   return await _descripcion.save();
// },

// listarAvancesPor_Tipo_Usuario: async ({ _id, tipo_usuario }) => {
//   if (tipo_usuario == "lider") {
//     const _avance = await Avance.findById({ _id })
//     return await _avance.find({ _avance});
//   }else{
//     return "No autorizado";
//   }

// },
// avancesPorID: async (args) => {
//   const _id = args._id;
//   return await Avance.findById(_id);
// },
