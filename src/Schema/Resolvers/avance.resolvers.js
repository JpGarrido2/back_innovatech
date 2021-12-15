const Avance = require("../../model/Avance");
const Inscripcion = require("../../model/inscripcion");
const moment = require("moment");

moment.locale("en");

const mapearInput = async (input) => {
  if (input?.id_proyecto) input.id_proyecto = input.id_proyecto;
  if (input?.id_usuario) input.id_usuario = input.id_usuario;
  if (input?.observacion) input.observacion = input.observacion;
  if (input?.descripcion) input.descripcion = input.descripcion;

  return input;
};
module.exports.resolversAvance = {
  crearAvance: async ({ input }, context) => {
    let fecha_actual =moment().format("MM-DD-YYYY")
    const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const _avance = new Avance(await mapearInput({ ...input, fecha_avances:fecha_actual  }));
    console.log(_avance);
    return await _avance.save();
  },


//Historia de usuario 22
  crearAvancePorId_Proyecto: async ({ input }) => { 
//>>>>>>> Stashed changes
    let fecha_actual =moment().format("MM-DD-YYYY") 
    const idu = input.id_usuario;
    const idp = input.id_proyecto;
    const _ins = await Inscripcion.findOne({
      id_proyecto: idp,
      id_usuario: idu,
    });

      //falta comprobar si el proyecto esta activo
      const _avance = new Avance(await mapearInput({ ...input, fecha_avances:fecha_actual  }));
      return await _avance.save();
    
    
  },

  listarAvances: async (_, context) => {
    const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");

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
///Historia de Usuario 18
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
//historia de usuario 18 listar avances como Lider
  listarAvancesPorTipo_usuario: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _id = args.id_usuario;
     {
      return await Avance.find({
        id_usuario: _id,
        
      }).lean().populate({
        path: "id_proyecto",
        select: "_id nombre_proyecto objetivo_general",
      });
    
    }
  },
  //Historia de usuario 21 listar avances como estudiante
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
    if ( usuario === "estudiante") {
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
