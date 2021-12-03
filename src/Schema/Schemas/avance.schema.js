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

    input AvanceInput {
        fecha_avances: Date
        descripcion: String!
        observacion:[ObservacionInput]   
    }
 
`;

module.exports.QUERY_AVANCES = `
    avancePorID(_id: ID!): Avance
    observacion:[Observacion]
    listarAvances: [Avance]
`;

module.exports.MUTATIONS_AVANCES = `
    crearAvance(input: AvanceInput): Avance
    eliminarAvancePorID(_id: ID): Avance
    agregarObservacionPorID(_id: ID,  input:ObservacionInput): Avance


`;
