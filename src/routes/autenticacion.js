const JWT_SECRET =
  process.env.jwt ||
  "98e4d53b3bf3cc17da517ed71272dfbc643dbf714c20d0196c1e6507fa12272c22677bdd2778a3674fb4a51f2b54e564947eb9b5d76d801bd068603ef332d4ea";

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

    let usuarioVerificado = jwt.verify(token, config.JWT_SECRET);
    if (!usuarioVerificado)
      return res.status(401).send({ estado: "Petición No autorizada." });

    req.user = usuarioVerificado;
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

module.exports = verificarTokenUsuario;
