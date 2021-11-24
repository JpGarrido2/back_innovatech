const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://dbUser:yMJkd7BwwHHGM0CZ@cluster0.e4tzb.mongodb.net/proyecto_?authSource=admin&replicaSet=atlas-a5b1pe-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

const client = new MongoClient(url);

async function main() {
  await client.connect();
  const db = client.db("Equipo_12_InnovaTECH_Ciclo4A");
  const collection = db.collection("login");
  const insertRresult = await collection.insertMany([
    {
      nombre: "felipe",
      email: "felipe55065@hotmail.com",
      rol: "admin",
      estado: "autorizado",
      identificacion: "1077872901",
      contrasena: "33432",
    },
  ]);
  console.log(insertRresult);

  //   SIN EL OBJETO COMO ARGUMENTO TRAE TODO LOS DATOS
  //   const filterResult = await collection.find().toArray();

  //    const filterResult = await collection.find({ nombre: "felipe" }).toArray();
  const filterResult = await collection.find();
  console.log(filterResult);
}
main()
  .then(() => {
    console.log("db success");
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    client.close();
  });
