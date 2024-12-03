import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      default: 0,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    unidadMedida: {
      type: String,
      required: [true, "La unidad de medida es obligatoria"],
      enum: [
        "UNIDAD",
        "METRO",
        "METRO_CUADRADO",
        "METRO_CUBICO",
        "KILOGRAMO",
        "GRAMO",
        "LITRO",
        "MILILITRO",
        "HORA",
        "DIA",
        "KILOMETRO",
        "PIEZA",
        "PAQUETE",
        "CAJA",
        "DOCENA",
      ],
      default: "UNIDAD",
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

export const Producto = mongoose.model("Producto", productoSchema);
