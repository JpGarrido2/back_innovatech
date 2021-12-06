module.exports.DEFINICION_AVANCES = `
    type Avance {
        _id: ID!
        id_proyecto: ID!
        id_usuario: ID!
        fecha_avance: Date!
        descripcion: String!
        observacion:[Observacion]
    }
    type Observacion{
        observacion:String!
        fecha_observacion:Date!
    }

    input ObservacionInput{
        observacion:String!
        
    }

    type descripcion{
        descripcion:String!    
    }

    input DescripcionInput{
        descripcion:String!
    } 

    input AvanceInput {
        id_proyecto: ID!
        id_usuario: ID!
        descripcion: String!
 
    }
 
`;

module.exports.QUERY_AVANCES = `
    avancePorID(_id: ID!): Avance
    observacion:[Observacion]
    listarAvances (_idU: ID!, _idP: ID!): [Avance]
    listarAvancesPorTipo_usuario(tipo_usuario: String!): [Avance]
    listarAvancesPorTipo_usuario_Estado(_id: ID, tipo_usuario: String!, estado:String!):[Avance]
   
`;

module.exports.MUTATIONS_AVANCES = `
    crearAvance(input: AvanceInput): Avance
    modificarDescripcionAvance (_idA: ID!, _descripcion: String!): Avance

    eliminarAvancePorID(_id: ID): Avance
    agregarObservacion (_id: ID, _idL: ID!, input: ObservacionInput): Avance
    agregarDescripcionPorTipo_Usuario_Estado(_id: ID, tipo_usuario: String!, estado: String!, input:DescripcionInput): Avance


`;
