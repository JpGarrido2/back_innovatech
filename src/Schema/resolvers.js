const { resolversUsuario } = require("../Schema/Resolvers/usuario.resolvers");
const { resolversAvance } = require("../Schema/Resolvers/avance.resolvers");
const { resolversProyecto } = require("../Schema/Resolvers/proyecto.resolvers");
const {
  resolversInscripcion,
} = require("../Schema/Resolvers/inscripcion.resolvers");

const resolvers = {
  ...resolversUsuario,
  ...resolversAvance,
  ...resolversProyecto,
  ...resolversInscripcion,
};

console.log(resolvers);

module.exports = resolvers;
