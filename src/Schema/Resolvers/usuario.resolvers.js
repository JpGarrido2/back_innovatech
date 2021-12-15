const Usuario = require("../../model/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;
const moment = require("moment");

const mapearInput = async (input) => {
  if (input?.password) {
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(input.password, salt);
    input = { ...input, password: passwordCrypt };
  }
  if (input?.fecha_egreso) {
    moment.locale("en");
    input = {
      ...input,
      fecha_egreso: moment(input.fecha_egreso, moment.ISO_8601).isValid()
        ? moment(input.fecha_egreso, moment.ISO_8601).format("L")
        : moment(input.fecha_egreso, "YYYY-MM-DD").format("L"),
    };
  }
  if (input?.fecha_ingreso) {
    moment.locale("en");
    input = {
      ...input,
      fecha_ingreso: moment(input.fecha_ingreso, moment.ISO_8601).isValid()
        ? moment(input.fecha_ingreso, moment.ISO_8601).format("L")
        : moment(input.fecha_ingreso, "YYYY-MM-DD").format("L"),
    };
  }
  console.log(input);
  return input;
};

const existe_usuario = async (email) => {
  const usuario = await Usuario.find({ email });
  if (usuario) {
    return true;
  }
  return false;
};

module.exports.resolversUsuario = {
  //usuarios: async (args, context) => {
  usuarios: async (args, context) => {
    try {
      const { usuarioVerificado } = context;
      if (!usuarioVerificado) throw new Error("Prohibido");
      const usuario = await Usuario.findById(args.id_usuario);
      if (usuario && usuario.tipo_usuario === "administrador") {
        return await Usuario.find();
      } else if (usuario && usuario.tipo_usuario === "líder") {
        return await Usuario.find({ tipo_usuario: "estudiante" });
      } else {
        throw new Error("Prohibido. No tiene suficientes permisos.");
      }
    } catch (error) {
      console.log(error);
    }
  },
  usuarioPorID: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    try {
      const _id = args._id;
      console.log(_id);
      return await Usuario.findById(_id);
    } catch (error) {
      console.log(error);
    }
  },
  usuarioPorNombre: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _nombre_completo = args.nombre_completo;
    return await Usuario.findOne({ nombre_completo: _nombre_completo });
  },
  usuarioPorIdentificacion: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _identificacion = args.identificacion;
    return await Usuario.findOne({ identificacion: _identificacion });
  },
  usuariosPorEstado: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _estado = args.estado;
    return await Usuario.find({ estado: _estado });
  },
  usuarioPorEstadoID: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _estado = args.estado;
    const _id = args._id;
    return await Usuario.findOne({ estado: _estado, _id: _id });
  },
  usuariosPorTipo: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _tipo_usuario = args.tipo_usuario;
    return await Usuario.find({ tipo_usuario: _tipo_usuario });
  },
  usuariosPorTipoID: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _tipo_usuario = args.tipo_usuario;
    const _id = args._id;
    return await Usuario.findOne({ tipo_usuario: _tipo_usuario, _id: _id });
  },
  usuarioPorEmail: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _email = args.email;
    return await Usuario.findOne({ email: _email });
  },
  usuariosPorFechaIngreso: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    args = mapearArgs(args);
    console.log(args);
    const _fecha_ingreso = args.fecha_ingreso;
    return await Usuario.find({ fecha_ingreso: _fecha_ingreso });
  },
  usuariosPorFechaEgreso: async (args, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    args = mapearArgs(args);
    const _fecha_egreso = args.fecha_egreso;
    return await Usuario.find({ fecha_egreso: _fecha_egreso });
  },
  login: async (args) => {
    const _email = args.email;
    const _password = args.password;
    const usuario = await Usuario.findOne({ email: _email });

    if (usuario && usuario.estado === "autorizado") {
      if (await bcrypt.compare(_password, usuario.password)) {
        const token = jwt.sign(
          { _id: usuario._id, email: _email },
          JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        return { token, usuario };
      } else {
        //throw new Error("No autenticado.");
        return {};
      }
    } else if (usuario) {
      //throw new Error("No autorizado.");
      return { token: "no autorizado", usuario };
    }
  },
  logout: async () => {
    return false;
  },
  crearUsuario: async ({ input, id_usuario }, context) => {
    try {
      if (
        "estado" in input &&
        (input["estado"] === "autorizado" ||
          input["estado"] === "no autorizado")
      ) {
        const { usuarioVerificado } = context;
        if (!usuarioVerificado) throw new Error("Prohibido");
        if (id_usuario) {
          const usuario = await Usuario.findById({ _id: id_usuario });
          if (
            usuario &&
            (usuario.tipo_usuario === "administrador" ||
              usuario.tipo_usuario === "líder")
          ) {
            if (existe_usuario(input.email)) {
              return {};
            }
            const _usuario = new Usuario(await mapearInput({ ...input }));
            return await _usuario.save();
          } else {
            throw new Error("Prohibido. No tiene suficientes permisos.");
          }
        } else {
          throw new Error(
            "Prohibido. No tiene suficientes permisos para modificar el estado."
          );
        }
      } else {
        if (existe_usuario(input.email)) {
          return {};
        }
        const _usuario = new Usuario(await mapearInput({ ...input }));
        return await _usuario.save();
      }
    } catch (error) {
      console.log(error);
    }
  },
  actualizarUsuarioPorID: async ({ _id, id_usuario, input }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    if ("estado" in input) {
      if (id_usuario) {
        const usuario = await Usuario.findById({ _id: id_usuario });
        if (
          usuario &&
          (usuario.tipo_usuario === "administrador" ||
            usuario.tipo_usuario === "líder")
        ) {
          const _usuario = await mapearInput({ ...input });
          return await Usuario.findByIdAndUpdate({ _id }, _usuario);
        } else {
          throw new Error("Prohibido. No tiene suficientes permisos.");
        }
      } else {
        throw new Error(
          "Prohibido. No tiene suficientes permisos para modificar el estado."
        );
      }
    } else {
      const _usuario = await mapearInput({ ...input });
      return await Usuario.findByIdAndUpdate({ _id }, _usuario);
    }
  },
  actualizarUsuarioPorIdentificacion: async (
    { identificacion, input },
    context
  ) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _usuario = await mapearInput({ ...input });
    return await Usuario.findOneAndUpdate({ identificacion }, _usuario);
  },
  actualizarUsuarioPorEmail: async ({ email, input }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    const _usuario = await mapearInput({ ...input });
    return await Usuario.findOneAndUpdate({ email }, _usuario);
  },
  eliminarUsuarioPorID: async ({ _id }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    return await Usuario.findByIdAndDelete({ _id });
  },
  eliminarUsuarioPorIdentificacion: async ({ identificacion }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    return await Usuario.findOneAndDelete({ identificacion });
  },
  eliminarUsuarioPorEmail: async ({ email }, context) => {
    const { usuarioVerificado } = context;
    if (!usuarioVerificado) throw new Error("Prohibido");
    return await Usuario.findOneAndDelete({ email });
  },
};
