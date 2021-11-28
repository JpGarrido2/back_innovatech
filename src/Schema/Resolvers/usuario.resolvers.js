const Usuario = require("../../model/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;
const moment = require("moment");
moment.locale("en");

const mapearArgs = (args) => {
  if (args?.fecha_egreso) {
    args = {
      ...args,
      fecha_egreso: new Date(
        moment(args.fecha_egreso, "DD/MM/YYYY").format("L")
      ).toISOString(),
    };
  }
  if (args?.fecha_ingreso) {
    args = {
      ...args,
      fecha_ingreso: new Date(
        moment(args.fecha_ingreso, "DD/MM/YYYY").format("L")
      ).toISOString(),
    };
  }
  return args;
};
const mapearInput = async (input) => {
  if (input?.password) {
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(input.password, salt);
    input = { ...input, password: passwordCrypt };
  }
  if (input?.fecha_egreso) {
    input = {
      ...input,
      fecha_egreso: moment(input.fecha_egreso, "DD/MM/YYYY").format("L"),
    };
    console.log(input);
  }
  if (input?.fecha_ingreso) {
    input = {
      ...input,
      fecha_ingreso: moment(input.fecha_ingreso, "DD/MM/YYYY").format("L"),
    };
  }
  return input;
};

module.exports.resolversUsuario = {
  usuarios: async () => {
    return await Usuario.find();
  },
  usuarioPorID: async (args) => {
    const _id = args._id;
    return await Usuario.findById(_id);
  },
  usuarioPorNombre: async (args, context) => {
    const { usuarioVerificado } = context;
    console.log(usuarioVerificado);
    const _nombre_completo = args.nombre_completo;
    return await Usuario.findOne({ nombre_completo: _nombre_completo });
  },
  usuarioPorIdentificacion: async (args) => {
    const _identificacion = args.identificacion;
    return await Usuario.findOne({ identificacion: _identificacion });
  },
  usuariosPorEstado: async (args) => {
    const _estado = args.estado;
    return await Usuario.find({ estado: _estado });
  },
  usuarioPorEstadoID: async (args) => {
    const _estado = args.estado;
    const _id = args._id;
    return await Usuario.findOne({ estado: _estado, _id: _id });
  },
  usuariosPorTipo: async (args) => {
    const _tipo_usuario = args.tipo_usuario;
    return await Usuario.find({ tipo_usuario: _tipo_usuario });
  },
  usuariosPorTipoID: async (args) => {
    const _tipo_usuario = args.tipo_usuario;
    const _id = args._id;
    return await Usuario.findOne({ tipo_usuario: _tipo_usuario, _id: _id });
  },
  usuarioPorEmail: async (args) => {
    const _email = args.email;
    return await Usuario.findOne({ email: _email });
  },
  usuariosPorFechaIngreso: async (args) => {
    args = mapearArgs(args);
    console.log(args);
    const _fecha_ingreso = args.fecha_ingreso;
    return await Usuario.find({ fecha_ingreso: _fecha_ingreso });
  },
  usuariosPorFechaEgreso: async (args) => {
    args = mapearArgs(args);
    const _fecha_egreso = args.fecha_egreso;
    return await Usuario.find({ fecha_egreso: _fecha_egreso });
  },
  login: async (args, request) => {
    const _email = args.email;
    const _password = args.password;
    const usuario = await Usuario.findOne({ email: _email });

    if (usuario && (await bcrypt.compare(_password, usuario.password))) {
      const token = jwt.sign({ _id: usuario._id, email: _email }, JWT_SECRET, {
        expiresIn: "2h",
      });

      return { token, usuario };
    } else {
      return null;
    }
  },
  crearUsuario: async ({ input }) => {
    const _usuario = new Usuario(await mapearInput({ ...input }));
    return await _usuario.save();
  },
  actualizarUsuarioPorID: async ({ _id, input }) => {
    const _usuario = await mapearInput({ ...input });
    return await Usuario.findByIdAndUpdate({ _id }, _usuario);
  },
  actualizarUsuarioPorIdentificacion: async ({ identificacion, input }) => {
    const _usuario = await mapearInput({ ...input });
    return await Usuario.findOneAndUpdate({ identificacion }, _usuario);
  },
  actualizarUsuarioPorEmail: async ({ email, input }) => {
    const _usuario = await mapearInput({ ...input });
    return await Usuario.findOneAndUpdate({ email }, _usuario);
  },
  eliminarUsuarioPorID: async ({ _id }) => {
    return await Usuario.findByIdAndDelete({ _id });
  },
  eliminarUsuarioPorIdentificacion: async ({ identificacion }) => {
    return await Usuario.findOneAndDelete({ identificacion });
  },
  eliminarUsuarioPorEmail: async ({ email }) => {
    return await Usuario.findOneAndDelete({ email });
  },
};
