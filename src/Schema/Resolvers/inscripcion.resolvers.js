const Inscripcion = require("../../model/Inscripcion");

module.exports.resolversInscripcion = {
  inscripcionPorID: async (args) => {
    const _id = args._id;
    return await Inscripcion.findById(_id);
  },
};
