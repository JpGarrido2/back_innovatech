const JWT_SECRET = process.env.jwt || "InnovaTech";

exports.verificarTokenUsuario = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send({ estado: "Acceso Denegado/ Petición No Autorizada." });

  try {
    token = token.split(" ")[1]; // Remover Bearer

    if (token === "null" || !token)
      return res.status(401).send({ estado: "Petición No Autorizada." });

    let usuarioVerificado = jwt.verify(token, config.JWT_SECRET);
    if (!usuarioVerificado)
      return res.status(401).send({ estado: "Petición No autorizada." });

    req.user = usuarioVerificado;
    next();
  } catch (error) {
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
