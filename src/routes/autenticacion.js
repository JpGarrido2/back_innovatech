const JWT_SECRET = process.env.TOKEN_SECRET;

function obtenerTokenPayload(token) {
  return jwt.verify(token, JWT_SECRET);
}

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

const validarUsuarioGHQL = (req, res, next) => {
  if (req.headers.authorization) {
    console.log(req.UsuarioVerificado);
  }
  next();
};

const obtenerUsuarioVerificado = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { usuarioVerificado } = obtenerTokenPayload(token);
      return usuarioVerificado;
    }
  } else if (authToken) {
    const { usuarioVerificado } = obtenerTokenPayload(authToken);
    return usuarioVerificado;
  }

  throw new Error("Sin autenticación.");
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
  verificarTokenUsuario,
  obtenerUsuarioVerificado,
  validarUsuarioGHQL,
};
