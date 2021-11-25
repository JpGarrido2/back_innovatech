const { buildSchema } = require("graphql");
const {
  DEFINICION_USUARIOS,
  QUERY_USUARIOS,
} = require("./Schemas/usuario.schema.js");
const {
  DEFINICION_PROYECTOS,
  QUERY_PROYECTOS,
} = require("./Schemas/proyecto.schema.js");
const {
  DEFINICION_AVANCES,
  QUERY_AVANCES,
} = require("./Schemas/avance.schema.js");
const {
  DEFINICION_INSCRIPCIONES,
  QUERY_INSCRIPCIONES,
} = require("./Schemas/inscripcion.schema.js");

let definiciones = `${DEFINICION_USUARIOS}${DEFINICION_PROYECTOS}${DEFINICION_AVANCES}${DEFINICION_INSCRIPCIONES}`;
let querys = `type Query {${QUERY_USUARIOS}${QUERY_PROYECTOS}${QUERY_AVANCES}${QUERY_INSCRIPCIONES}}`;
console.log(`${definiciones}${querys}`);
module.exports = buildSchema(`${definiciones}${querys}`);
