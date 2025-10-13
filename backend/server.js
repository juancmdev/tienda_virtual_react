const express = require("express"); //Importar la librería express
require("dotenv").config(); //Cargar dotenv para las variables de entorno
const mongoose = require("mongoose"); //Importar mongoose
const cors = require("cors"); //Importamos cors
const app = express(); //Crear una instancia de la aplicación Express
const PORT = 5000; // Usamos el puerto 5000 para el Backend
const Producto = require("./models/Product"); //Importamos el modelo
const User = require("./models/User"); //Importamos el modelo

// Middleware:
//Habilitar CORS para que el Frontend pueda comunicarse
app.use(cors());

//Habilitar la lectura de datos JSON en el cuerpo de las peticiones
app.use(express.json());

//RUTAS DE LA API

app.get("/api/productos", async (req, res) => {
  try {
    // 1. Usa find() para buscar TODOS los productos de la DB
    // Usamos await porque la operación de base de datos es ASÍNCRONA
    const productos = await Producto.find();

    // 2. Si la búsqueda es exitosa, envía los productos como respuesta JSON
    res.json(productos);
  } catch (error) {
    // 3. Si hay un error, respondemos con el código 500 (Error Interno del Servidor)
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor al obtener productos.",
      error: error.message,
    });
  }
});

//Ruta para crear un nuevo producto
app.post("/api/productos", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear un nuevo producto:", error);

    // Verificación de Mongoose: ¿Es un error de validación (ej. faltó el nombre)?
    if (error.name === "ValidationError") {
      // Si es error de validación (datos faltantes/incorrectos), usamos el código 400 (Bad Request)
      res.status(400).json({
        mensaje:
          "Error de validación. Asegúrate de incluir todos los campos obligatorios.",
        error: error.message,
      });
    } else {
      // Si es cualquier otro error (conexión, interno, etc.), usamos 500 (Internal Server Error)
      res.status(500).json({
        mensaje: "Error interno del servidor al crear un nuevo producto.",
        error: error.message,
      });
    }
  }
});

//Ruta para crear la cuenta de administrador
app -
  post("/api/auth/register", async (req, res) => {
    try {
      const { email, password } = req.body;
      // 1. Crear nueva instancia de usuario
      const user = new User({ email, password });
      // 2. Guardar el usuario (Mongoose se encarga de llamar a bcrypt)
      await user.save();
      // 3. Responder con éxito
      res
        .status(201)
        .json({ mensaje: "Usuario creado exitosamente", nuevoUsuario });
    } catch (error) {}
  });

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
