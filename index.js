import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/products.router.js";

// Cargar variables de entorno desde un archivo .env
import dotenv from "dotenv";
// Configurar dotenv para que lea el archivo .env
dotenv.config();

const app = express();
const PORT = 3000;
// URL de conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/products", productRouter);

// Conectar a Mongo y levantar servidor
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
  }
};

startServer();
