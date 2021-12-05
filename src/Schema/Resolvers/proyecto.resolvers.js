const Proyecto = require("../../model/proyecto");
const Avance = require("../../model/Avance")
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
  proyectos: async () => {
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

  proyecto_ID: async (args) => {
    const _id = args._id;
    return await Proyecto.findById(_id);
  },
  proyecto_nombre: async (args) => {
    const nombre_proyecto = args.nombre_proyecto;
    const datos = await Proyecto.findOne({ nombre_proyecto: nombre_proyecto });
    return datos;
  },
  proyecto_fecha_inicio: async (args) => {
    const _identificacion = args.fecha_inicio;
    return await Proyecto.findOne({ identificacion: _identificacion });
  },
  proyecto_estado: async (args) => {
    const estado = args.estado;
    const datos = await Proyecto.find({ estado: estado });
    return datos;
  },

  proyecto_id_usuario: async (args) => {
    const usuario_id = args.id_usuario;
    let datos = await Proyecto.find({ id_usuario: usuario_id }).populate({
      path: "id_usuario",
      select: "_id nombre_completo tipo_usuario email",
    });
    return datos;
  },

  updateProyecto: async ({ _id, input }) => {
    const _proyecto = { ...input };
     return await Proyecto.findByIdAndUpdate({ _id }, _proyecto);
  },

  crearProyecto: async ({ input }) => {
    const _proyecto = new Proyecto(await mapearInput({ ...input }));
    return await _proyecto.save();
  },

  crearObjetivoEspecifico: async ({ _id, input }) => {
    const _proyecto = await Proyecto.findById({ _id });

    const _objetivo = _proyecto.objetivo_especifico;
    const proyecto = await Proyecto.findByIdAndUpdate(
      { _id },
      { objetivo_especifico: [..._objetivo, input] }
    );

    return proyecto;
  },

  actualizarProyecto_ID: async ({ _id, input }) => {
    const _proyecto = { ...input };

    return await Proyecto.findByIdAndUpdate({ _id }, _proyecto);
  },
  actualizarproyecto_doc_identificacion: async ({
    doc_identificacion,
    input,
  }) => {
    const _proyecto = await { ...input };
    return await Proyecto.findOneAndUpdate({ doc_identificacion }, _proyecto);
  },
  actualizarproyecto_estado: async ({ _id, input }) => {
    const _proyecto = await { ...input };

    return await Proyecto.findOneAndUpdate({ _id: _id }, _proyecto);
  },

  actualizarface_proyecto: async ({ _id, input }) => {
    const _proyecto = await { ...input };

    return await Proyecto.findOneAndUpdate({ _id: _id }, _proyecto);
  },
  actualizar_fecha_terminacion: async ({ fecha, input }) => {
    const _proyecto = await { ...input };
    return await Proyecto.findOneAndUpdate({ fecha }, _proyecto);
  },
  eliminarproyecto_objetivo_general: async ({ objetivo_general }) => {
    const _proyecto = await { ...input };
    return await Proyecto.findOneAndDelete({ objetivo_general }, _proyecto);
  },
  eliminarproyecto_ID: async ({ _id }) => {
    return await Usuario.findByIdAndDelete({ _id });
  },
};
