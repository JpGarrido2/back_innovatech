module.exports.DEFINICION_INSCRIPCIONES = `
    type Inscripcion {
        _id: ID
    }
`;

module.exports.QUERY_INSCRIPCIONES = `
    inscripcionPorID(_id: ID!): Inscripcion
`;
