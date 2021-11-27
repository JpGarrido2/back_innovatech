const Inscripcion = require("../../model/inscripcion");


const mapearInput = async (input) => {
  input.fecha_egreso = "01/01/2022";
  input.fecha_ingreso = "01/01/2021";
  input.estado = "Pendiente";
  return input;
};

module.exports.resolversInscripcion = {
 //---------Querys---------------------------------------------------------
  crearInscripcion: async ({ input }) => {
    const _inscripcion = new Inscripcion(await mapearInput({ ...input }));
    //const _inscripcion = new Inscripcion(input);
    console.log(_inscripcion);
    return await _inscripcion.save();
  },
  listarInscripciones: async () => {
    return await Inscripcion.find();
  },
  inscripcionPorID: async (args) => {
    const _id = args._id;
    return await Inscripcion.findById(_id);
  },
  inscripcionPorEstado: async (args) => {
    const _estado = args.estado;
    return await Inscripcion.find({ estado: _estado });
  },
  inscripcionPorFechaIngreso: async (args) => {
    const _fecha_ingreso = args.fecha_ingreso;
    console.log(_fecha_ingreso);
    return await Inscripcion.find({ fecha_ingreso: _fecha_ingreso });
  },
  inscripcionPorFechaEgreso: async (args) => {
    const _fecha_egreso = args.fecha_egreso;
    return await Inscripcion.find({ fecha_egreso: _fecha_egreso });
  },
  //-----------Mutaciones---------------------------------------------------
  eliminarInscripcionPorID: async ({ _id }) => {
    return await Inscripcion.findByIdAndDelete({ _id });
  },
  eliminarInscripcionPorEstado: async ({ estado }) => {
    //return await Inscripcion.findByIdAndDelete({ estado });
    console.log({estado});
    return await Inscripcion.deleteMany({ estado : estado})
  },
  aceptarInscripcionPorID: async ({_id, estado}) => {
    //return await Inscripcion.findByIdAndDelete({ estado });
    console.log({estado});
    return await Inscripcion.findByIdAndUpdate(_id, {estado: "Aceptada"}, {new: true})
  },
  
  
};
