module.exports.DEFINICION_PROYECTOS = `
    type Proyecto {
        _id: ID
        nombre_proyecto: String!
        identificacion: Int!
        presupuesto: Int!
        estado: String!
        fecha_inicio: Date!
        fecha_terminacion: Date!
        face_proyecto: String!
        objetivo_general: String!
        objetivo_especifico: String!
        id_usuario: Object!

    }

    input ProyectoInput {
        nombre_proyecto: String!
        identificacion: Int!
        presupuesto: Int!
        estado: String!
        fecha_inicio: Date!
        fecha_terminacion: Date!
        face_proyecto: String!
        objetivo_general: String!
        objetivo_especifico: String!
        id_usuario: Object!
    }
`;
module.exports.QUERY_PROYECTOS = `
    proyecto_ID(_id: ID!): Proyecto
    proyecto_nombre_proyecto(nombre_proyecto: String!): Proyecto
    proyecto_identificacion(identificacion: Int!): Proyecto
    proyecto_presupuesto(presupuesto: Int!): Proyecto
    proyecto_estado(estado: String!): Proyecto
    proyecto_fecha_inicio(fecha_inicio: Date!): Proyecto
    proyecto_fecha_terminacion(fecha_terminacion: Date!): Proyecto
    proyecto_face_proyecto(face_proyecto: String!): Proyecto
    proyecto_objetivo_general(objetivo_general: String!): Proyecto
    proyecto_objetivo_especifico(objetivo_especifico: String!): Proyecto
    proyecto_id_usuario(id_usuario: Object!): Proyecto
`;

module.exports.MUTATIONS_PROYECTOS = `
    crearProyecto(input: ProyectoInput): Proyecto
    actualizarproyecto_ID(_id: ID!, input: ProyectoInput): Proyecto
    actualizarproyecto_identificacion(identificacion: Int!, input: ProyectoInput): Proyecto
    actualizarproyecto_estado(estado: String!, input: ProyectoInput): Proyecto
    eliminarproyecto_objetivo_especifico(objetivo_especifico:String!, input: ProyectoInput): Proyecto
    eliminarproyecto_ID(_id: ID!, input: ProyectoInput): Proyecto
`;
