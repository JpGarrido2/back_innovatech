module.exports.DEFINICION_USUARIOS = `
    
    type Usuario {
        _id: ID!
        nombre_completo: String!
        identificacion: Int!
        estado: String!
        tipo_usuario: String!
        email: String!
        fecha_ingreso: Date!
        fecha_egreso: Date!
    }

    input UsuarioInput {
        nombre_completo: String!
        identificacion: Int!
        estado: String!
        tipo_usuario: String!
        email: String!
        password: String!
        fecha_ingreso: Date!
        fecha_egreso: Date!
    }
    input UsuarioAInput {
        nombre_completo: String
        identificacion: Int
        estado: String
        tipo_usuario: String
        email: String
        password: String
        fecha_ingreso: Date
        fecha_egreso: Date
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
    usuariosPorFechaIngreso(fecha_ingreso: Date!) : [Usuario]
    usuariosPorFechaEgreso(fecha_egreso: Date!) : [Usuario]
`;

module.exports.MUTATIONS_USUARIOS = `
    crearUsuario(input: UsuarioInput): Usuario
    actualizarUsuarioPorID(_id: ID!, input: UsuarioAInput): Usuario
    actualizarUsuarioPorIdentificacion(identificacion: Int!, input: UsuarioAInput) : Usuario
    actualizarUsuarioPorEmail(email: String!, input: UsuarioAInput) : Usuario
    eliminarUsuarioPorID(_id: ID): Usuario
    eliminarUsuarioPorIdentificacion(identificacion: Int!) : Usuario
    eliminarUsuarioPorEmail(email: String!) : Usuario
`;
