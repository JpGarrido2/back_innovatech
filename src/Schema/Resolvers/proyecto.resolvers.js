const Proyecto = require("../../model/proyecto");
const moment = require("moment");
moment.locale("en");

const mapearArgs = (args) => {
  if (args?.face_proyecto) {
    args = {
      ...args,
      face_proyecto: new Date(
        moment(args.face_proyecto, "").format("")
      ).toISOString(),
    };
  }
  if (args?.nombre_proyecto) {
    args = {
      ...args,
      nombre_proyecto: new Date(
        moment(args.nombre_proyecto, "").format("")
      ).toISOString(),
    };
  }
  return args;
};

const mapearInput = async (input) => {
  if (input?.fecha_inicio) {
    input = {
      ...input,
      fecha_egreso: moment(input.fecha_inicio, "DD/MM/YYYY").format("L"),
    };
    console.log(input);
  }
  if (input?.fecha_terminacion) {
    input = {
      ...input,
      fecha_ingreso: moment(input.fecha_terminacion, "DD/MM/YYYY").format("L"),
    };
  }
  return input;
};

module.exports.resolversProyecto = {
  proyecto_ID: async (args) => {
    const _id = args._id;
    return await Proyecto.findById(_id);
  },

  proyecto_nombre_proyecto: async (args) => {
    const _nombre_completo = args.nombre_proyecto;
    return await Usuario.findOne({ nombre_completo: _nombre_completo });
  },
  proyecto_fecha_inicio: async (args) => {
    const _identificacion = args.fecha_inicio;
    return await Usuario.findOne({ identificacion: _identificacion });
  },
  proyecto_estado: async (args) => {
    const _estado = args.estado;
    return await Usuario.find({ estado: _estado });
  },
  crearProyecto: async ({ input }) => {
    const _proyecto = new Proyecto(await mapearInput({ ...input }));
    return await _proyecto.save();
  },
  actualizarProyecto_ID: async ({ _id, input }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findByIdAndUpdate({ _id }, _proyecto);
  },
  actualizarproyecto_doc_identificacion: async ({
    doc_identificacion,
    input,
  }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndUpdate({ doc_identificacion }, _proyecto);
  },
  actualizarproyecto_estado: async ({ estado, input }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndUpdate({ estado }, _proyecto);
  },

  eliminarproyecto_objetivo_general: async ({ objetivo_general }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndDelete({ objetivo_general }, _proyecto);
  },
  eliminarproyecto_ID: async ({ _id }) => {
    return await Usuario.findByIdAndDelete({ _id });
  },
};
