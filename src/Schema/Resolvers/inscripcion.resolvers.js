const Inscripcion = require("../../model/inscripcion");
const Usuario = require("../../model/usuario");
const Proyecto = require("../../model/proyecto");
const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("en");

const mapearInput = async (input) => {
  input.id_proyecto = mongoose.Types.ObjectId(input.id_proyecto);
  input.id_usuario = mongoose.Types.ObjectId(input.id_usuario);
  //input.fecha_egreso= "01/01/2000";
  //input.fecha_ingreso= "01/01/2000";
  input.estado = "Pendiente";
  return input;
};

module.exports.resolversInscripcion = {
  //---------Querys---------------------------------------------------------
  /*  crear: async () => {
  const Post =       
  {
    id_proyecto: mongoose.Types.ObjectId("6021150a1f183b248c8a8e3f"),
    id_usuario: mongoose.Types.ObjectId("6021150a1f183b248c8a8e3f"),
    fecha_egreso: "01/01/2022",
    fecha_ingreso: "01/01/2021",
    estado: "Pendiente"
  }
        console.log(Post);
        const _usuario = new Inscripcion(Post);
        return await _usuario.save();

},
 */

  crearInscripcion: async ({ input }) => {
    const idu = input.id_usuario;
    const idp = input.id_proyecto;
    const _ins = await Inscripcion.findOne({ id_proyecto: idp, id_usuario: idu});
    if(!_ins){
    const _inscripcion = new Inscripcion(await mapearInput({ ...input }));
    return await _inscripcion.save();
    } else {
      throw new Error("Ya se encuentra inscrito a este proyecto.");
      //console.log("Ya esta inscrito");
      //return null;
    }
  },
  inscripcionesPorIDLider: async (args) => {
    const idL = args._idL;
    const idP = args._idP;
    const proyecto = await Proyecto.findById(idP);
    console.log(proyecto.id_usuario);
    console.log(idL);
    if (proyecto.id_usuario == idL){
      const inscripciones = await Inscripcion.find({ id_proyecto: idP});
      console.log(inscripciones);
      return inscripciones;
    } else{
      return null;
    }
   //let insLider = inscripciones.filter(inscripciones => inscripciones.id_proyecto === _id);
   
  },
  listarInscripciones: async () => {
    return await Inscripcion.find();
  },
  inscripcionPorID: async (args) => {
    const _id = args._id;
    return await Inscripcion.findById(_id);
  },
  inscripcionesPorIDProyecto: async (args) => {
    const id = args._id;
    return await Inscripcion.find({ id_proyecto: id });
  },

  inscripcionesPorIDUsuario: async (args) => {
    const id = args._id;
    let datos = await Inscripcion.find({ id_usuario: id });
    let resul = { datos: [...datos] };
    console.log(resul.datos);
    return datos;
  },
  inscripcionPorEstado: async (args) => {
    const _estado = args.estado;
    return await Inscripcion.find({ estado: _estado });
  },
  inscripcionPorIDUsuarioyEstado: async (args) => {
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
    const eliminado = await Inscripcion.deleteMany({ estado: estado });
    console.log(eliminado.deletedCount);
    if (eliminado.deletedCount>0){

      return "Eliminación exitosa";
    } else {

      return "No se encontraron inscripciones para eliminar";
    }
    
  },
  actualizarEstadoInscripcionPorID: async ({ _id, estado }) => {
    //return await Inscripcion.findByIdAndDelete({ estado });

    if (estado == "Aceptada") {
      let now = moment().format("L");
      return await Inscripcion.findByIdAndUpdate(
        _id,
        { estado: estado, fecha_ingreso: now },
        { new: true }
      );
    } else {
      return await Inscripcion.findByIdAndUpdate(
        _id,
        { estado: estado },
        { new: true }
      );
    }
  },
};
