const { buildSchema } = require("graphql");
const {
  DEFINICION_USUARIOS,
  QUERY_USUARIOS,
  MUTATIONS_USUARIOS,
} = require("./Schemas/usuario.schema.js");
const {
  DEFINICION_PROYECTOS,
  QUERY_PROYECTOS,
  MUTATIONS_PROYECTOS,
} = require("./Schemas/proyecto.schema.js");
const {
  DEFINICION_AVANCES,
  QUERY_AVANCES,
  MUTATIONS_AVANCES,
} = require("./Schemas/avance.schema.js");
const {
  DEFINICION_INSCRIPCIONES,
  QUERY_INSCRIPCIONES,
  MUTATIONS_INSCRIPCIONES,
} = require("./Schemas/inscripcion.schema.js");

let definiciones = `scalar Date ${DEFINICION_USUARIOS}${DEFINICION_PROYECTOS}${DEFINICION_AVANCES}${DEFINICION_INSCRIPCIONES}`;
let querys = `type Query {${QUERY_USUARIOS}${QUERY_PROYECTOS}${QUERY_AVANCES}${QUERY_INSCRIPCIONES}}`;
let mutations = `type Mutation {${MUTATIONS_USUARIOS}${MUTATIONS_PROYECTOS}${MUTATIONS_AVANCES}${MUTATIONS_INSCRIPCIONES}}`;
console.log(`${definiciones}${querys}${mutations}`);
module.exports = buildSchema(`${definiciones}${querys}${mutations}`);
