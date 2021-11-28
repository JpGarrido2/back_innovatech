const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const { mongoose } = require("./database");
const {
  obtenerUsuarioVerificado,
  validarUsuarioGHQL,
} = require("./routes/autenticacion");

//GraphQL
const { graphqlHTTP } = require("express-graphql");

//Variables de entorno
dotenv.config();

// crear el servidor
const app = express();

// configuraciones
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

//Valida autenticación en modo producción  dejar así por el momento.
app.use(validarUsuarioGHQL);

//Incializar esquemas y resolver del Graphql
const root = require("./Schema/resolvers");
const schema = require("./Schema/schema");

//Ruta Graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
    context: ({ req }) => {
      return {
        ...req,
        usuarioVerificado:
          req && req.headers.authorization
            ? obtenerUsuarioVerificado(req)
            : null,
      };
    },
  })
);

//

//=======
// const inscripcion = require(path.join(__dirname, "/routes/inscripcion.routes.js"));
// const proyecto = require(path.join(__dirname, "/routes/proyecto.routes.js"));
// const avance = require(path.join(__dirname, "/routes/avance.routes.js"));
// const usuario = require(path.join(__dirname, "/routes/usuario.routes.js"));

// app.use("/api/usuario", usuario);
// app.use("/api/inscripcion", inscripcion);
// app.use("/api/proyecto", proyecto);
// app.use("/api/avance", avance);
//>>>>>>> main

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")} `);
});
