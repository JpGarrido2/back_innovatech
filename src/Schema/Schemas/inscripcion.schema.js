module.exports.DEFINICION_INSCRIPCIONES = `
    type Inscripcion {
        _id: ID
    }

    input InscripcionInput {
        id_proyecto: ID
    }
`;

module.exports.QUERY_INSCRIPCIONES = `
    inscripcionPorID(_id: ID!): Inscripcion
`;

module.exports.MUTATIONS_INSCRIPCIONES = `
    crearInscripcion(input: InscripcionInput): Inscripcion
`;
