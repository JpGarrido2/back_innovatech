module.exports.DEFINICION_INSCRIPCIONES = `
    type Inscripcion {
        _id: ID!
        id_proyecto: InscripcionProyecto
        id_usuario: ID!
        id_lider: ID!
        estado: String!
        fecha_ingreso: Date
        fecha_egreso: Date
    }
    type InscripcionProyecto{
        _id: ID!
        nombre_proyecto: String
        estado: String
    }
    
    

    input InscripcionInput {
        id_proyecto: ID!
        id_usuario: ID!
        id_lider: ID!

    }
`;

module.exports.QUERY_INSCRIPCIONES = `
    inscripcionesPorIDLideryProyecto(_idL: ID!, _idP: ID!): [Inscripcion]
    inscripcionesTodoPorIDLider (_idL: ID!): [Inscripcion]
    listarInscripciones: [Inscripcion]
    inscripcionPorID(_id: ID!): Inscripcion
    inscripcionesPorIDProyecto: [Inscripcion]
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
