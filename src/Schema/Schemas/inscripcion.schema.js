module.exports.DEFINICION_INSCRIPCIONES = `
    type Inscripcion {
        _id: ID!
        id_proyecto: ID!
        id_usuario: ID!
        estado: String!
        fecha_ingreso: Date
        fecha_egreso: Date
    }

    
    

    input InscripcionInput {
        id_proyecto: ID!
        id_usuario: ID!

    }
`;

module.exports.QUERY_INSCRIPCIONES = `
    inscripcionesPorIDLider(_idL: ID!, _idP: ID!): [Inscripcion]
    listarInscripciones: [Inscripcion]
    inscripcionPorID(_id: ID!): Inscripcion
    inscripcionesPorIDProyecto(_id: ID!): [Inscripcion]
    inscripcionesPorIDUsuario(_id: ID!): [Inscripcion]
    inscripcionPorIDUsuarioyEstado(_id: ID!, estado: String!): [Inscripcion]
    inscripcionPorEstado(estado: String!) : [Inscripcion]
    inscripcionPorFechaIngreso(fecha_ingreso: Date!) : [Inscripcion]
    inscripcionPorFechaEgreso(fecha_egreso: Date!) : [Inscripcion]
`;

module.exports.MUTATIONS_INSCRIPCIONES = `
    crearInscripcion(input: InscripcionInput): Inscripcion
    eliminarInscripcionPorID(_id: ID): Inscripcion
    eliminarInscripcionPorEstado(estado: String!): String
    actualizarEstadoInscripcionPorID(_id: ID!, estado: String!): Inscripcion

    crear: Inscripcion
`;
