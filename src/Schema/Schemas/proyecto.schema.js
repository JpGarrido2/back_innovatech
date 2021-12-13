module.exports.DEFINICION_PROYECTOS = `
    type Proyecto {
        _id: ID!
        objetivo_general: String!
        objetivo_especifico: String!
        nombre_proyecto: String!
        presupuesto: Int!
        estado: String!
        fecha_inicio: Date!
        fecha_terminacion: Date
        fase_proyecto: String
        id_usuario: [UsuarioProyecto]
        
    
    }

    type Objetivo_especifico{
        objetivo_especifico:String!
       
    }
    type UsuarioProyecto{
        _id: ID!
        nombre_completo: String
        tipo_usuario: String
        email: String
        estado: String
    }
    type ProyectoAvance{
        fecha_avance:Date
        descripcion: String
        observaciones: [Observaciones]
    }

    type Observaciones{
        observacion:String!
        fecha_observacion:Date
    }

     input ObjetivoInput{
        objetivo_especifico:String!
        fecha_creacion:Date
    }
    input ProyectoInput {
        nombre_proyecto: String
        presupuesto: Int
        estado: String
        fecha_inicio: Date
        fecha_terminacion: Date
        fase_proyecto: String
        objetivo_general: String
        objetivo_especifico: String
        id_usuario: String
    }



    input ProyectoAInput {
        nombre_proyecto: String
        identificacion: Int
        presupuesto: Int
        estado: String
        fecha_inicio: Date
        fecha_terminacion: Date
        fase_proyecto: String
        objetivo_general: String
        objetivo_especifico: String
        id_usuario: String
    }

    input UpdateProyecto{
        nombre_proyecto: String
        objetivo_general: String
        objetivo_especifico: String
        presupuesto: Int
    }
`;

module.exports.QUERY_PROYECTOS = `
    proyecto_ID(_id: ID!): Proyecto
    proyectos:[Proyecto]
    proyecto_avance(_id:ID!):ProyectoAvance
    proyecto_nombre(nombre_proyecto: String!): Proyecto
    proyecto_presupuesto(presupuesto: Int!): Proyecto
    proyecto_estado(estado: String!): [Proyecto!]!
    proyecto_fecha_inicio(fecha_inicio: Date!): Proyecto
    proyecto_fecha_terminacion(fecha_terminacion: Date!): Proyecto
    proyecto_fase_proyecto(fase_proyecto: String!): Proyecto
    proyecto_objetivo_general(objetivo_general: String!): Proyecto
    proyecto_objetivo_especifico(objetivo_especifico: String!): Proyecto
    proyecto_id_usuario(id_usuario: String!): [Proyecto]
    
`;

module.exports.MUTATIONS_PROYECTOS = `
    crearProyecto(input: ProyectoInput): Proyecto
    crearObjetivoEspecifico(_id: ID! input:ObjetivoInput):Proyecto
    updateProyecto(_id: ID!, input: UpdateProyecto): Proyecto
    actualizar_fecha_terminacion(fecha_terminacion: String!, input:ProyectoAInput):Proyecto
    actualizarproyecto_estado(_id: ID!,input: ProyectoAInput): Proyecto
    actualizarfase_proyecto(_id: ID!, input: ProyectoAInput):Proyecto
    eliminarproyecto_objetivo_general(objetivo_general:String!): Proyecto
    eliminarproyecto_ID(_id: ID!): Proyecto
`;
