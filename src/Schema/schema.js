const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Usuario {
        _id: ID
        nombre_completo: String
        identificacion: Int
        estado: String
        tipo_usuario: String
        email: String 
    }
    type Query {
        usuario(email: String!): Usuario
        
    }
`);
//avancesPorUsuario(_id: Int!): Avances
// type Avances {

// }
// type Inscripcion {

// }
// type Proyecto {

// }
// proyecto(_id: Int!): Proyecto
// inscripcion(nombre: String!): Inscripcion
