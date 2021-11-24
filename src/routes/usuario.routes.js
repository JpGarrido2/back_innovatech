const express = require("express");
const router = express.Router();
const Usuario = require("../model/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;
const verificarTokenUsuario = require("./autenticacion");

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    console.log(usuarios);
    if (usuarios?.length && usuarios.length > 0) {
      res.json(usuarios);
    } else {
      res.status(201).json({
        estado: "Identificacion no encontrada.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(201).json({
      estado: "Error al obtener Logins.",
    });
  }
});

router.get("/:id", verificarTokenUsuario, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    console.log(usuario);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(201).json({
        estado: "usuario no encontrado.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(201).json({
      estado: "Error al obtener usuario.",
    });
  }
});

router.get(
  "/identificacion/:identificacion",
  verificarTokenUsuario,
  async (req, res, next) => {
    try {
      const usuario = await Usuario.find()
        .where("identificacion")
        .equals(req.params.identificacion);
      console.log(usuario);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(201).json({
          estado: "Identificacion no encontrada.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(201).json({
        estado: "Error en busqueda de identificación.",
      });
    }
  }
);

router.post("/validar", async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!(email && contrasena)) {
      return res.status(200).send({ estado: 0 });
    }

    const usuario = await Usuario.findOne({
      email,
    });

    if (usuario && (await bcrypt.compare(contrasena, usuario.contrasena))) {
      const token = jwt.sign({ usuario_id: usuario._id, email }, JWT_SECRET, {
        expiresIn: "2h",
      });

      usuario.token = token;

      res.status(200).header("auth-token", token).json(usuario);
    } else {
      res.status(200).send({ estado: 1 });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ estado: -1 });
  }
});

router.get("/email/:email", verificarTokenUsuario, async (req, res, next) => {
  try {
    const usuario = await Usuario.find()
      .where("email")
      .equals(req.params.email);
    console.log(usuario);
    if (usuario) {
      res.json(usuario);
    } else {
      console.log(err);
      res.status(201).json({
        estado: "Email no encontrado.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(201).json({
      estado: "Error en busqueda de email.",
    });
  }
});

router.post("/", verificarTokenUsuario, async (req, res) => {
  try {
    const { email, identificacion, nombre_completo, contrasena, rol, estado } =
      req.body;
    const salt = bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);
    const _Usuario = new Usuario({
      email,
      identificacion,
      nombre_completo,
      contrasenaEncriptada,
      rol,
      estado,
    });
    const usuario = await _Usuario.save();
    console.log(usuario);
    if (usuario) {
      res.json(usuario);
    } else {
      console.log(err);
      res.status(201).json({
        estado: "Usuario no guardado.",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(201).json({
      estado: "Error al guardar usuario.",
    });
  }
});
router.delete("/:id", verificarTokenUsuario, async (req, res) => {
  try {
    const estudiante = await Usuario.findByIdAndRemove(req.params.id);
    console.log(estudiante);
    if (estudiante) {
      res.json({ estado: "Usuario eliminado." });
    } else {
      console.log(err);
      res.status(201).json({
        estado: "Usuario no eliminado.",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(201).json({
      estado: "Error al eliminar usuario.",
    });
  }
});

module.exports = router;
