const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
});

const Product = mongoose.model("Producto", productSchema);

module.exports = Product;
