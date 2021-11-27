
module.exports.DEFINICION_INSCRIPCIONES = `
    type Inscripcion {
        _id: ID!
        _id_proyecto: ID
        _id_usuario: ID
        estado: String!
        fecha_ingreso: Date!
        fecha_egreso: Date!
    }

    input InscripcionInput {
        _id_proyecto: ID
        _id_usuario: ID
    }
`;

module.exports.QUERY_INSCRIPCIONES = `
    listarInscripciones: [Inscripcion]
    inscripcionPorID(_id: ID!): Inscripcion
    inscripcionPorEstado(estado: String!) : [Inscripcion]

    inscripcionPorFechaIngreso(fecha_ingreso: Date!) : [Inscripcion]
    inscripcionPorFechaEgreso(fecha_egreso: Date!) : [Inscripcion]
`;

module.exports.MUTATIONS_INSCRIPCIONES = `
    crearInscripcion(input: InscripcionInput): Inscripcion
    eliminarInscripcionPorID(_id: ID): Inscripcion
    eliminarInscripcionPorEstado(estado: String!): [Inscripcion]
    aceptarInscripcionPorID(_id: ID): Inscripcion
`;
