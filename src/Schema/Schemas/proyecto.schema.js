module.exports.DEFINICION_PROYECTOS = `
    type Proyecto {
        _id: ID
    }
`;
module.exports.QUERY_PROYECTOS = `
    proyectoPorID(_id: ID!): Proyecto
`;
