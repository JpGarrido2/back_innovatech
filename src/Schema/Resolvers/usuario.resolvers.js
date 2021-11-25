const Usuario = require("../../model/usuario");

module.exports.resolversUsuario = {
  usuarioPorID: async (args) => {
    const _id = args._id;
    return await Usuario.findById(_id);
  },
  usuarioPorNombre: async (args) => {
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
};
