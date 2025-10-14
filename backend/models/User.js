const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // 1. Generar el salt con 10 rondas de hashing
  const salt = await bcrypt.genSalt(10);

  // 2. Generar el hash a partir de la contraseña actual (this.password) y el salt
  // y REEMPLAZAMOS la contraseña de texto plano en el documento de Mongoose
  this.password = await bcrypt.hash(this.password, salt);

  // Continuar con el proceso de guardado
  next();
});

module.exports = mongoose.model("User", userSchema);
