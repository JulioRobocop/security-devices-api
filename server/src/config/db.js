import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Conexão assíncrona com o banco de dados
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("DB connected!");
  } catch (error) {
    console.error("Error", error);
    // Caso haja algum erro, o processo é finalizado
    process.exit(1);
  }
};

export default connectDB;
