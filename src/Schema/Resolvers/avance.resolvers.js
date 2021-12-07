const Avance = require("../../model/Avance");
const mongoose = require("mongoose");
const Inscripcion = require("../../model/inscripcion");

const moment = require("moment");
moment.locale("en");

const mapearInput = async (input) => {
  input.id_proyecto = input.id_proyecto;
  input.id_usuario = input.id_usuario;
  input.observacion = input.observacion;
  input.descripcion = input.descripcion;

  return input;
};
module.exports.resolversAvance = {
  crearAvance: async ({ input }, context) => {
    // const { usuarioVerificado } = context;
    // if (!usuarioVerificado) throw new Error("Prohibido");
    const _avance = new Avance(await mapearInput({ ...input }));
    console.log(_avance);
    return await _avance.save();
  },

  crearAvancePorId_Proyecto: async ({ input }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const idu = input.id_usuario;
    const idp = input.id_proyecto;
    const _ins = await Inscripcion.findOne({
      id_proyecto: idp,
      id_usuario: idu,
    });
    console.log(_ins.estado);

    if (_ins.estado === "Aceptada") {
      //falta comprobar si el proyecto esta activo
      const _avance = new Avance(await mapearInput({ ...input }));
      return await _avance.save();
    } else {
      throw new Error("No puede agregar un avance a este proyecto");
    }
  },

  listarAvances: async (_, context) => {
    // const { usuarioVerificado } = context;
    // if (!usuarioVerificado) throw new Error("Prohibido");

    let datos = await Avance.find().lean().populate({
      path: "id_proyecto",
      select: "_id nombre_proyecto objetivo_general",
    });
    console.log(...datos);
    return datos;
  },

  eliminarAvancePorID: async ({ _id }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    return await Avance.findByIdAndDelete({ _id });
  },

  agregarObservacionPorID: async ({ _id, tipo_usuario, input }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    if (tipo_usuario == "lider") {
      const _avance = await Avance.findById({ _id });
      const _observacion = _avance.observacion;
      const avance = await Avance.findByIdAndUpdate(
        { _id },
        { observacion: [..._observacion, input] }
      );
      console.log(_observacion);
      return avance;
    } else {
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
  },

  listarAvancesPorTipo_usuario: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const usuariolider = args.tipo_usuario;
    const _id = args.id_proyecto;
    const _estado = args.estado;
    if (usuariolider === "lider" && _estado === "activo") {
      return await Avance.find({
        id_proyecto: _id,
        tipo_usuario: usuariolider,
        estado: _estado,
      });
    } else {
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
  },
  //Historia de usuario 21
  listarAvancesPorTipo_usuario_Estado: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _estado = args.estado;
    const idp = args.id_proyecto;
    const usuario = args.tipo_usuario;
    if (usuario === "estudiante" && _estado === "Aceptada") {
      const avance = await Avance.find({
        id_proyecto: idp,
        estado: _estado,
        tipo_usuario: usuario,
      });
      console.log(avance);
      return avance;
    } else {
      throw new Error("Prohibido. No tiene suficientes permisos.");
    }
  },

  //Historia de usuario 23
  actualizarDescripcionPorTipo_Usuario_Estado: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const idA = args.id_avance;
    const usuario = args.tipo_usuario;
    const ds = args._descripcion;
    const _avance = await Avance.findById(idA);
    //console.log(_avance);
    if (_avance && usuario === "estudiante") {
      return await Avance.findByIdAndUpdate(
        idA,
        { descripcion: ds },
        { new: true }
      );
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
