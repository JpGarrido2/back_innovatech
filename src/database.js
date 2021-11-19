const mongoose = require("mongoose");

const URI =
  "mongodb+srv://dbUser:yMJkd7BwwHHGM0CZ@cluster0.e4tzb.mongodb.net/Equipo_12_InnovaTECH_Ciclo4A?authSource=admin&replicaSet=atlas-a5b1pe-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

const dbConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("db connect");
  } catch (error) {
    console.log("error al conectar", error);
  }
};

dbConnection();
