const Avance = require("../../model/Avance");
const descripcion = require("../../model/Avance");
const mongoose = require("mongoose");
const Usuario = require("../../model/usuario");
const Inscripcion = require("../../model/inscripcion");


const moment = require("moment");
moment.locale("en");

const mapearInput = async (input) => {
  input.id_proyecto = mongoose.Types.ObjectId(input.id_proyecto);
  input.id_usuario = mongoose.Types.ObjectId(input.id_usuario);
  //input.tipo_usuario = "estudiante";
  input.fecha_avance = moment().format("L");

  return input;
};
module.exports.resolversAvance = {

  crearAvance: async ({ input }) => { 
    const idu = input.id_usuario;
    const idp = input.id_proyecto;
    const _ins = await Inscripcion.findOne({ id_proyecto: idp, id_usuario: idu});
    console.log(_ins.estado);

    if(_ins.estado === "Aceptada"){ //falta comprobar si el proyecto esta activo
      const _avance = new Avance(await mapearInput({ ...input }));
      return await _avance.save(); 
    } else {
      throw new Error("No puede agregar un avance a este proyecto");

    }
 
  },

  listarAvances: async (args) => {
    const idU = args._idU;
    const idP = args._idP;
    const _ins = await Inscripcion.findOne({ id_proyecto: idP, id_usuario: idU});
    console.log(_ins.estado);

    if(_ins.estado === "Aceptada"){ 
      const _avances = await Avance.find({ id_proyecto: idP });
      return await _avances;
    } else {
      throw new Error("No puede ver los avances de este proyecto");

    }
  },
  modificarDescripcionAvance: async (args) => {
    const idA = args._idA;
    const ds = args._descripcion;
    const _avance = await Avance.findById(idA)
    //console.log(_avance);
    if(_avance){
      return await Avance.findByIdAndUpdate(idA, {descripcion: ds}, { new: true });

    }

  },

  agregarObservacion: async ({ _id , _idL,  input})=>{
    //const _avance = await Avance.findById({ _id })
    const _usuario = await Usuario.findById(_idL);
    input.fecha_observacion = moment().format("L");
    if (_usuario.tipo_usuario == "lider") {
      const _avance = await Avance.findById({ _id })
      const _observacion = _avance.observacion
      const avance = await Avance.findByIdAndUpdate({ _id }, { observacion: [..._observacion, input] }, { new: true })
      console.log(_observacion)
      return avance
    }else{
      throw new Error("No tiene permisos para agregar observaciones");
    }
  
  },


/// las funciones de aqui en adelante pueden no funcionar porque realice cambios en schemas y en el modelo



  eliminarAvancePorID: async ({ _id }) => {
    return await Avance.findByIdAndDelete({ _id });
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


   
};

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
