module.exports.DEFINICION_USUARIOS = `
    type Usuario {
        _id: ID
        nombre_completo: String
        identificacion: Int
        estado: String
        tipo_usuario: String
        email: String 
    }
`;

module.exports.QUERY_USUARIOS = `
    usuarioPorID(_id: ID!): Usuario
    usuarioPorNombre(nombre_completo: String!): Usuario
    usuarioPorIdentificacion(identificacion: Int): Usuario
    usuariosPorEstado(estado: String!) : [Usuario]
    usuarioPorEstadoID(estado: String!, _id: ID!): Usuario  
    usuariosPorTipo(tipo_usuario: String): [Usuario]
    usuariosPorTipoID(tipo_usuario: String, _id: ID!): Usuario
    usuario(email: String!): Usuario 
`;
