module.exports.DEFINICION_AVANCES = `
    type Avance {
        _id: ID!
        id_proyecto: ID!
        id_usuario: ID!
        fecha_avances: Date
        descripcion: String!
        observacion:[Observacion]
    }
    
 

    type Observacion{
        observacion:String!
        fecha_observacion:Date
    }

    input ObservacionInput{
        observacion:String!
        fecha_observacion:Date
    }

    type descripcion{
        descripcion:String!    
    }

    input DescripcionInput{
        descripcion:String!
    } 

    input AvanceInput {
        fecha_avances: Date
        descripcion: String!
        observacion:[ObservacionInput]   
    }

    input AvanceporIdInput {
        fecha_avances: Date
        descripcion: String!
         
    }
 
`;

module.exports.QUERY_AVANCES = `
    avancePorID(_id: ID!): Avance
    observacion:[Observacion]
    listarAvances: [Avance]
    listarAvancesPorTipo_usuario(_id: ID, tipo_usuario: String!): [Avance]
    listarAvancesPorTipo_usuario_Estado(estado: String!, id_proyecto: ID!, tipo_usuario:String!):[Avance]
   
`;

module.exports.MUTATIONS_AVANCES = `
    crearAvance(input: AvanceInput): Avance
    crearAvancePorId_Proyecto(input: AvanceInput, estado: String!, id_usuario: ID!, id_proyecto: ID!): Avance
    eliminarAvancePorID(_id: ID): Avance
    agregarObservacionPorID(_id: ID, tipo_usuario: String!, input:ObservacionInput): Avance
    actualizarDescripcionPorTipo_Usuario_Estado(id_proyecto:ID, tipo_usuario: String!, estado: String!, input:DescripcionInput): Avance


`;
