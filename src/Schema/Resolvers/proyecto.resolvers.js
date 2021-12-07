const Proyecto = require("../../model/proyecto");
const Avance = require("../../model/Avance");
const moment = require("moment");
moment.locale("en");

const mapearInput = async (input) => {
  input.objetivo_especifico = input.objetivo_especifico;

  return input;
};

const mapearArgs = (args) => {
  if (args?.fecha_inicio) {
    args = {
      ...args,
      fecha_inicio: new Date(
        moment(args.fecha_inicio, "DD/MM/YYYY").format("L")
      ).toISOString(),
    };
  }
  if (args?.fecha_terminacion) {
    args = {
      ...args,
      fecha_terminacion: new Date(
        moment(args.fecha_terminacion, "DD/MM/YYYY").format("L")
      ).toISOString(),
    };
  }
  return args;
};

module.exports.resolversProyecto = {
  proyectos: async (_,context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    let datos = await Proyecto.find().populate({
      path: "id_usuario",
      select: "_id nombre_completo tipo_usuario email",
    });
    return datos;
  },

  // pendiente
  proyecto_avances: async (args) => {
    const _idProyecto = args._id;
    const _idAvance = args._idAvance;
    return await Proyecto.findById(_id);
  },

  proyecto_ID: async (args,context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const _id = args._id;
    return await Proyecto.findById(_id);
  },
  proyecto_nombre: async (args,context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const nombre_proyecto = args.nombre_proyecto;
    const datos = await Proyecto.findOne({ nombre_proyecto: nombre_proyecto });
    return datos;
  },
  proyecto_fecha_inicio: async (args,context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const _identificacion = args.fecha_inicio;
    return await Proyecto.findOne({ identificacion: _identificacion });
  },
  proyecto_estado: async (args,context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const estado = args.estado;
    const datos = await Proyecto.find({ estado: estado });
    return datos;
  },
  // pendiente filtrar los proyectos solo del lider
  proyecto_id_usuario: async (args,context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const usuario_id = args.id_usuario;
    let datos = await Proyecto.find({ id_usuario: usuario_id })
      .lean()
      .populate({
        path: "id_usuario",
        select: "_id nombre_completo tipo_usuario email",
      });
    let a = { ...datos };
    let b = a["0"].id_usuario;
    let c = b;
    let d = JSON.stringify(c[0].tipo_usuario);
    let lider = d.replace(/['"]+/g, "");

    if (lider == "lider") {
      return datos;
    } else {
    }
  },

  updateProyecto: async ({ _id, input }, context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const _proyecto = { ...input };
    const proyectoId = await Proyecto.findById({ _id });
    console.log(proyectoId.estado);
    const datos = await Proyecto.findByIdAndUpdate({ _id }, _proyecto);
    if (proyectoId.estado == "activo") {
      return datos;
    } else {
      return;
    }
  },

  crearProyecto: async ({ input }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");

    const _proyecto = new Proyecto(
      await mapearInput({ ...input, estado: "inactivo", fecha_inicio: null, fecha_terminacion:null })
    );
    return await _proyecto.save();
  },

  crearObjetivoEspecifico: async ({ _id, input }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _proyecto = await Proyecto.findById({ _id });

    const _objetivo = _proyecto.objetivo_especifico;
    const proyecto = await Proyecto.findByIdAndUpdate(
      { _id },
      { objetivo_especifico: [..._objetivo, input] }
    );

    return proyecto;
  },

  actualizarProyecto_ID: async ({ _id, input },context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");

    const _proyecto = { ...input };

    return await Proyecto.findByIdAndUpdate({ _id }, _proyecto);
  },
  actualizarproyecto_doc_identificacion: async ({doc_identificacion,input,},context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");

    const _proyecto = await { ...input };
    return await Proyecto.findOneAndUpdate({ doc_identificacion }, _proyecto);
  },
  actualizarproyecto_estado: async ({ _id, input },context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    let fecha_actual = moment().format("MM-DD-YYYY");
    const _proyecto = await { ...input, fecha_terminacion: fecha_actual };
    l;
    let estado = input.estado;
    if (estado == "inactivo") {
      return await Proyecto.findOneAndUpdate({ _id: _id }, _proyecto);
    }
  },

  actualizarface_proyecto: async ({ _id, input },context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    let fase_proyecto = input.face_proyecto;
    console.log(fase_proyecto);
    if (fase_proyecto == "terminado") {
      const _proyecto = await { ...input, estado: "inactivo" };
      return await Proyecto.findOneAndUpdate({ _id: _id }, _proyecto);
    }
  },
  actualizar_fecha_terminacion: async ({ fecha, input },context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const _proyecto = await { ...input };
    return await Proyecto.findOneAndUpdate({ fecha }, _proyecto);
  },
  eliminarproyecto_objetivo_general: async ({ objetivo_general },context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
    const _proyecto = await { ...input };
    return await Proyecto.findOneAndDelete({ objetivo_general }, _proyecto);
  },
  eliminarproyecto_ID: async ({ _id },context) => {
     const { usuarioVerificado } = context;
     if (!usuarioVerificado) throw new Error("Prohibido");
git    return await Usuario.findByIdAndDelete({ _id });
  },
};
