const express = require("express"); //Importar la librería express
require("dotenv").config(); //Cargar dotenv para las variables de entorno
const mongoose = require("mongoose"); //Importar mongoose
const cors = require("cors"); //Importamos cors
const app = express(); //Crear una instancia de la aplicación Express
const PORT = 5000; // Usamos el puerto 5000 para el Backend
const Producto = require("./models/Product"); //Importamos el modelo
const User = require("./models/User"); //Importamos el modelo
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//-------------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
//-------------------------------------------------------------
//Middleware para verificar el Token JWT
const verifyToken = (req, res, next) => {
  //Obtener el header de autorización
  const authHeader = req.headers["authorization"];

  //Si no hay header de autorización o no empi3eza con 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //403 Forbideen: No tienes permiso
    return res.status(403).json({
      mensaje: "Acceso denegado. Token no proporcionado o formato incorrecto.",
    });
  }

  //Extraer el token (eliminar, 'Bearer')
  const token = authHeader.split(" ")[1];

  //Verificar el token usando jwt.verify
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      //401 Unauthorized: El token es inválido (expirado, alterado, etc)
      return res.status(401).json({
        mensaje: "Acceso denegado. Token inválido o expirado.",
      });
    }

    // Si es válido, adjuntar los datos del usuario (id) a la petición (req, user)
    req.user = jwt.decoded;

    //Continuar con la ejecución de la ruta
    next();
  });
};

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

//Ruta para crear un nuevo producto (¡Protegida)
app.post("/api/productos", verifyToken, async (req, res) => {
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
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Crear nueva instancia de usuario
    const user = new User({ email, password });
    // 2. Guardar el usuario (Mongoose se encarga de llamar a bcrypt)
    await user.save();
    // 3. Responder con éxito
    res.status(201).json({ mensaje: "Usuario creado exitosamente", user });
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);

    // 1. Verificamos si es un error de Mongoose por unicidad (email duplicado)
    if (error.code === 11000) {
      // Si el código es 11000, respondemos con 400 Bad Request
      res.status(400).json({
        mensaje:
          "Error de registro: El email ya está en uso. Intenta con otro.",
        error: error.message,
      });
    } else {
      // 2. Si es cualquier otro error (validación fallida, conexión, etc.)
      res.status(500).json({
        mensaje: "Error interno del servidor al crear el usuario.",
        error: error.message,
      });
    }
  }
});

//Ruta para iniciar sesión
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Encontrar al usuario
    const user = await User.findOne({ email });
    // 2. Si el usuario no existe, devolvemos 404. Usamos un mensaje genérico por seguridad.
    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    // 3. Comparar la contraseña ingresada (plano) con el hash guardado (user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    // 4. Si las contraseñas no coinciden, devolvemos 401 Unauthorized.
    if (!isMatch) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Definir el payload
    const payload = {
      id: user._id, // Usamos el ID de MongoDB para identificar al usuario más tarde
    };

    // Generar el token
    const token = jwt.sign(
      // El Payload: la información a guardar
      payload,
      process.env.JWT_SECRET, // clave secreta!
      { expiresIn: "1h" } //Token expira en una hora
    );

    res.json({
      mensaje: "¡Inicio de sesión exitoso!",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor al iniciar sesión.",
      error: error.message,
    });
  }
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

//Ruta para eliminar productos
app.delete("/api/productos/:id", async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto");
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Finalmente, llamamos a la función
connectDB();

//Poner a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
