const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    urlImagen: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    categoria: {
      // <-- ¡NUEVO CAMPO AÑADIDO!
      type: String,
      required: false, // Por ahora, lo dejamos opcional
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Producto", productSchema);

module.exports = Product;
