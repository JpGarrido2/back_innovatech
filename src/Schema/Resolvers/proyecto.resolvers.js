const Proyecto = require("../../model/proyecto");
const bcrypt = require("bcryptjs");
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


module.exports.resolversProyecto = {
  proyectoPorID: async (args) => {
    const _id = args._id;
    return await Proyecto.findById(_id);
  },

  nombre_proyecto: async (args) => {
    const _nombre_completo = args.nombre_completo;
    return await Usuario.findOne({ nombre_completo: _nombre_completo });
  },
  fecha_inicio: async (args) => {
    const _identificacion = args.identificacion;
    return await Usuario.findOne({ identificacion: _identificacion });
  },
  estado_proyecto: async (args) => {
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
  actualizarproyecto_identificacion: async ({ identificacion, input }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndUpdate({ identificacion }, _proyecto);
  },
  actualizarproyecto_estado: async ({ estado, input }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndUpdate({ estado }, _proyecto);
  },

  eliminarproyecto_objetivo_especifico: async ({ objetivo_especifico, input }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndUpdate({ objetivo_especifico }, _proyecto);
  },
  eliminarproyecto_ID: async ({ _id, input  }) => {
    const _proyecto = await mapearInput({ ...input });
    return await Proyecto.findOneAndUpdate({_id, input }, _proyecto);
  },


};
