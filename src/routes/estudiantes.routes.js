const express = require("express");
const router = express.Router();
const Estudiante = require("../model/estudiantes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;
const verificarTokenUsuario = require("./autenticacion");

//router.get("/", verificarTokenUsuario, async (req, res) => {
router.get("/", async (req, res) => {
  try {
    const estudiantes = await Estudiante.find({}, (err, docs) => {
      console.log(docs);
    });
    console.log(estudiantes);
    if (estudiantes?.length) {
      res.json(estudiantes);
    } else {
      res.estado(201).json({
        estado: "Estudiantes no encontrados.",
      });
    }
  } catch (error) {
    console.log(error);
    res.estado(201).json({
      estado: "Error al obtener estudiante.",
    });
  }
});

//router.get("/:id", verificarTokenUsuario, async (req, res) => {
router.get("/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    console.log(estudiante);
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.estado(201).json({
        estado: "Estudiante no encontrado.",
      });
    }
  } catch (err) {
    console.log(err);
    res.estado(201).json({
      estado: "Error al buscar estudiante",
    });
  }
});

// router.get(
//   "/identificacion/:identificacion",
//   async (req, res, next) => {
router.get("/identificacion/:identificacion", async (req, res, next) => {
  try {
    const estudiante = await Estudiante.find()
      .where("identificacion")
      .equals(req.params.identificacion);
    console.log(estudiante);
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.estado(201).json({
        estado: "Identificación de estudiante no encontrada.",
      });
    }
  } catch (err) {
    console.log(err);
    res.estado(201).json({
      estado: "Error al buscar identificación de estudiante.",
    });
  }
});

router.post("/validar", async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!(email && contrasena)) {
      return res.estado(200).send({ estado: 0 });
    }

    const usuario = await Estudiante.findOne({ email });
    if (usuario && (await bcrypt.compare(contrasena, usuario.contrasena))) {
      const token = jwt.sign({ usuario_id: usuario._id, email }, JWT_SECRET, {
        expiresIn: "2h",
      });

      usuario.token = token;

      res.estado(200).header("auth-token", token).json(usuario);
    } else {
      res.estado(200).send({ estado: 1 });
    }
  } catch (err) {
    console.log(err);
    res.estado(200).send({ estado: -1 });
  }
});

//router.get("/email/:email", verificarTokenUsuario, async (req, res, next) => {
router.get("/email/:email", async (req, res, next) => {
  try {
    const estudiante = await Estudiante.find()
      .where("email")
      .equals(req.params.email);
    console.log(estudiante);
    if (estudiante.length > 0) {
      res.json(estudiante);
    } else {
      res.estado(201).json({
        estado: "No encontrado.",
      });
    }
  } catch (error) {
    console.log(error);
    res.estado(201).json({
      estado: "Error al buscar email de estudiante.",
    });
  }
});

//router.post("/", verificarTokenUsuario, async (req, res) => {
router.post("/", async (req, res) => {
  try {
    const {
      nombre_estudiante,
      identificacion,
      fecha_ingreso,
      fecha_egreso,
      id_proyecto,
    } = req.body;
    const estudiante = new Estudiante({
      nombre_estudiante,
      identificacion,
      fecha_ingreso,
      fecha_egreso,
      id_proyecto,
    });
    const resultado = await estudiante.save();
    console.log(estudiante);
    resultado === estudiante
      ? res.json({ estado: "guardado" })
      : res.json({ estado: "Error al guardar estudiante." });
  } catch (error) {
    console.log(error);
    res.estado(201).json({
      estado: "Error al guardar estudiante.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      nombre_estudiante,
      identificacion,
      fecha_ingreso,
      fecha_egreso,
      id_proyecto,
    } = req.body;
    const estudiante = {
      nombre_estudiante,
      identificacion,
      fecha_ingreso,
      fecha_egreso,
      id_proyecto,
    };
    await Estudiante.findByIdAndUpdate(req.params.id, estudiante);
    res.json({ estado: "actualizado" });
  } catch (error) {
    console.log(error);
    res.estado(201).json({
      estado: "Error al actualizar estudiante.",
    });
  }
});

//router.delete("/:id", verificarTokenUsuario, async (req, res) => {
router.delete("/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndRemove(req.params.id);
    console.log(estudiante);
    rres.json({ estado: "eliminado" });
  } catch (error) {
    console.log(error);
    res.estado(201).json({
      estado: "Error al eliminar estudiante.",
    });
  }
});

module.exports = router;
