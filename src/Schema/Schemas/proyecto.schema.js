module.exports.DEFINICION_PROYECTOS = `
    type Proyecto {
        _id: ID
    }

    input ProyectoInput {
        objetivo_general: String
    }
`;
module.exports.QUERY_PROYECTOS = `
    proyectoPorID(_id: ID!): Proyecto
`;

module.exports.MUTATIONS_PROYECTOS = `
    crearProyecto(input: ProyectoInput): Proyecto
`;
