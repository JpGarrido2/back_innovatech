const Avance = require("../../model/Avance");

module.exports.resolversAvance = {
  avancePorID: async (args) => {
    const _id = args._id;
    return await Avance.findById(_id);
  },
};
