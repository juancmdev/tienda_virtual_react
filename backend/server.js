// 1. Importar la librería express
const express = require("express");

// 2. Crear una instancia de la aplicación Express
const app = express();

// 3. Definir el puerto
// Usamos el puerto 5000 para el Backend
const PORT = 5000;

// 4. Poner a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
