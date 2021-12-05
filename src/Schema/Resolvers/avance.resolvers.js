const Avance = require("../../model/Avance");
const descripcion = require("../../model/Avance");
const mongoose = require("mongoose");
const {tipo_usuario} = require("../../model/usuario");

const moment = require("moment");
moment.locale("en");

const mapearInput = async (input) => {
  input.id_proyecto = mongoose.Types.ObjectId(input.id_proyecto);
  input.id_usuario = mongoose.Types.ObjectId(input.id_usuario);
  input.observacion= (input.observacion)
  input.descripcion= (input.descripcion)
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
 
  agregarObservacionPorID: async ({ _id , tipo_usuario, input})=>{
    if (tipo_usuario == "lider") {
      const _avance = await Avance.findById({ _id })
      const _observacion = _avance.observacion
      const avance = await Avance.findByIdAndUpdate({ _id }, { observacion: [..._observacion, input] })
      console.log(_observacion)
      return avance
    }else{
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
  
  },

  listarAvancesPorTipo_usuario: async ({tipo_usuario})=>{
    if (tipo_usuario=="lider" ){      
      return await Avance.find();
    }else{
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
  },

  listarAvancesPorTipo_usuario_Estado: async ({_id, tipo_usuario, estado})=>{
    if (tipo_usuario=="estudiante" && estado=="activo"){
           
      return await Avance.find({_id})
    }else{
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
  },


  agregarDescripcionPorTipo_Usuario_Estado: async ({ _id, estado, tipo_usuario, input }) => {
    if (estado == "activo" && tipo_usuario == "estudiante") {
      const _descripcion = await mapearInput({ ...input });
      return await descripcion.findByIdAndUpdate({ _id }, _descripcion);

    } else {
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
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
