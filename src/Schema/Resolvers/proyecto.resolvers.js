const Proyecto = require("../../model/proyecto");

module.exports.resolversProyecto = {
  proyectoPorID: async (args) => {
    const _id = args._id;
    return await Proyecto.findById(_id);
  },
};
