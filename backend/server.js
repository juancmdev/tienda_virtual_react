//Importar la librería express
const express = require("express");
//Cargar dotenv para las variables de entorno
require("dotenv").config();

// 2. Importar mongoose
const mongoose = require("mongoose");

//Crear una instancia de la aplicación Express
const app = express();

//Definir el puerto
// Usamos el puerto 5000 para el Backend
const PORT = 5000;

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Conexión a MongoDB exitosa");

    // Colocamos app.listen AQUÍ para arrancar solo si la conexión es exitosa
    //Poner a escuchar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    // Si hay un error, detenemos la aplicación (salida con código 1)
    process.exit(1);
  }
};

// Finalmente, llamamos a la función
connectDB();

//Poner a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
