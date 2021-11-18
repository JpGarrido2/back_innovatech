const express = require("express");
const router = express.Router();
const Login = require("../model/login");

router.get("/", async (req, res) => {
  try {
    const login = await Login.find({ }, (err, docs) => {
      console.log(docs);
    });
    console.log(login);
    res.json(login);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
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

router.get("/identificacion/:identificacion", async (req, res, next) => {
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
});

router.post("/", async (req, res) => {
  try {
    const {
      correo,
      identificacion,
      nombre_completo,
      password,
      tipo_usuario,
      estado,
    } = req.body;
    const login = new Login({
      correo,
      identificacion,
      nombre_completo,
      password,
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
router.delete("/:id", async (req, res) => {
  try {
    const login = await Login.findByIdAndRemove(req.params.id);
    console.log(login);
    res.json(login);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
