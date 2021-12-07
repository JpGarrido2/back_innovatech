const express = require("express");
const router = express.Router();
const Login = require("../model/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = 10;
const JWT_SECRET = process.env.jwt || "InnovaTech";
const verificarTokenUsuario = require("./autenticacion");

router.get("/", verificarTokenUsuario, async (req, res) => {
  try {
    const login = await Login.find({}, (err, docs) => {
      console.log(docs);
    });
    console.log(login);
    res.json(login);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", verificarTokenUsuario, async (req, res) => {
  try {
    const usuario = await Login.findById(req.params.id);
    console.log(usuario);
    res.json(usuario);
  } catch (err) {
    console.log(err);
    res.status(201).json({
      status: "No encontrado.",
    });
  }
});

router.get(
  "/identificacion/:identificacion",
  verificarTokenUsuario,
  async (req, res, next) => {
    try {
      const usuario = await Login.find()
        .where("identificacion")
        .equals(req.params.identificacion);
      console.log(usuario);
      if (usuario.length > 0) {
        res.json(usuario);
      } else {
        res.status(201).json({
          status: "No encontrado.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(201).json({
        status: "Error",
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
    // Validate if user exist in our database
    const usuario = await Login.findOne({ email });
    if (usuario && (await bcrypt.compare(contrasena, usuario.contrasena))) {
      const token = jwt.sign({ usuario_id: usuario._id, email }, JWT_SECRET, {
        expiresIn: "2h",
      });

      // save user token
      usuario.token = token;

      // user
      res.status(200).header("auth-token", token).json(usuario);
    } else {
      res.status(200).send({ estado: 1 });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ estado: -1 });
  }
  // Our register logic ends here
});

router.get("/email/:email", verificarTokenUsuario, async (req, res, next) => {
  try {
    const usuario = await Login.find().where("email").equals(req.params.email);
    console.log(usuario);
    if (usuario.length > 0) {
      res.json(usuario);
    } else {
      res.status(201).json({
        status: "No encontrado.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(201).json({
      status: "Error",
    });
  }
});

router.post("/", verificarTokenUsuario, async (req, res) => {
  try {
    const {
      correo,
      identificacion,
      nombre_completo,
      password,
      tipo_usuario,
      estado,
    } = req.body;
    const encryptedPassword = await bcrypt.hash(password, salt);
    const login = new Login({
      correo,
      identificacion,
      nombre_completo,
      encryptedPassword,
      tipo_usuario,
      estado,
    });
    await login.save();

    console.log(login);
    res.json(login);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", verificarTokenUsuario, async (req, res) => {
  try {
    const login = await Login.findByIdAndRemove(req.params.id);
    console.log(login);
    res.json(login);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
