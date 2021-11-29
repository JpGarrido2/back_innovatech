module.exports.DEFINICION_AVANCES = `
    type Avance {
        _id: ID
    }

    input AvanceInput {
        id_proyecto: ID
    }
`;

module.exports.QUERY_AVANCES = `
    avancePorID(_id: ID!): Avance
`;

module.exports.MUTATIONS_AVANCES = `
    crearAvance(input: AvanceInput): Avance
`;
