import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fabrica: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fabrica",
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Categoria = mongoose.model("Categoria", categoriaSchema);
