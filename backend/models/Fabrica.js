import mongoose from "mongoose";

const fabricaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la fábrica es obligatorio"],
      trim: true,
    },
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
    },
    localidad: {
      type: String,
      required: [true, "La localidad es obligatoria"],
      default: "Venado Tuerto",
      trim: true,
    },
    provincia: {
      type: String,
      required: [true, "La provincia es obligatoria"],
      default: "Santa Fe",
      trim: true,
    },
    pais: {
      type: String,
      required: [true, "El país es obligatorio"],
      default: "Argentina",
      trim: true,
    },
    numeroFabrica: {
      type: Number,
      required: [true, "El número de fábrica es obligatorio"],
      unique: true,
      default: 1,
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

export const Fabrica = mongoose.model("Fabrica", fabricaSchema);
