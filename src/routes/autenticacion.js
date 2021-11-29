const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;

const obtenerTokenPayload = (token, JWT_SECRET) => {
  return jwt.verify(token, JWT_SECRET);
};

const validarUsuarioGHQL = (req, res, next) => {
  if (req.headers.authorization) {
    console.log(req.UsuarioVerificado);
  }
  next();
};

const obtenerUsuarioVerificado = (req, authToken = "") => {
  try {
    if (req) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        if (!token) {
          //throw new Error("No token found");
          return null;
        }
        const usuarioVerificado = obtenerTokenPayload(token, JWT_SECRET);
        return usuarioVerificado;
      }
    } else if (authToken) {
      const usuarioVerificado = obtenerTokenPayload(authToken, JWT_SECRET);
      return usuarioVerificado;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
  //throw new Error("Sin autenticación.");
};

const verificarTokenUsuario = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .send({ estado: "Acceso Denegado/ Petición No Autorizada." });

  try {
    token = token.split(" ")[1]; // Remover Bearer

    if (token === "null" || !token)
      return res.status(401).send({ estado: "Petición No Autorizada." });

    let usuarioVerificado = obtenerTokenPayload(token);
    if (!usuarioVerificado)
      return res.status(401).send({ estado: "Petición No autorizada." });

    req.usuario = usuarioVerificado;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ estado: "Token Invalido" });
  }
};

// exports.esUsuario = async (req, res, next) => {
//   if (req.usuaurio.tipoUsuario === 0) {
//     next();
//   }
//   return res.status(401).send("Unauthorized!");
// };
// exports.esAdmin = async (req, res, next) => {
//   if (req.usuario.tipoUsuario === 1) {
//     next();
//   }
//   return res.status(401).send("Unauthorized!");
// };

module.exports = {
  obtenerUsuarioVerificado,
  verificarTokenUsuario,
  validarUsuarioGHQL,
};
