const Usuario = require("../model/usuario");
const Avance = require("../model/Avance");

module.exports = {
  usuario: async (args) => {
    const _email = args.email;
    return await Usuario.findOne({ email: _email });
  },
  avancesPorUsuario: async (args) => {
    const _avance = await Avance.findById(args._id);
    console.log(_avance);
    return _avance;
  },
};
