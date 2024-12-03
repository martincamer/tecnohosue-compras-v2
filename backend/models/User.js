import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const permissionSchema = {
  ver: { type: Boolean, default: false },
  acceso: { type: Boolean, default: false },
  crear: { type: Boolean, default: false },
  editar: { type: Boolean, default: false },
  eliminar: { type: Boolean, default: false },
  aprobar: { type: Boolean, default: false },
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El username es obligatorio"],
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    fabrica: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fabrica",
      required: [true, "La fábrica es obligatoria"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    rol: {
      type: String,
      required: [true, "El rol es obligatorio"],
      enum: [
        "SUPER_ADMIN",
        "ADMIN_FABRICA",
        "COMPRADOR",
        "APROBADOR",
        "USUARIO",
      ],
      default: "USUARIO",
    },
    permisos: {
      compras: permissionSchema,
      ordenesCompra: permissionSchema,
      facturas: permissionSchema,
      pagos: permissionSchema,
      productos: permissionSchema,
      proveedores: permissionSchema,
      reportes: permissionSchema,
    },
    verificado: {
      type: Boolean,
      default: false,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    enLinea: {
      type: Boolean,
      default: false,
    },
    ultimaConexion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Modificar los permisos por defecto según rol
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("rol")) {
    switch (this.rol) {
      case "SUPER_ADMIN":
        // Tiene todos los permisos en todos los módulos
        Object.keys(this.permisos).forEach((modulo) => {
          Object.keys(this.permisos[modulo]).forEach((permiso) => {
            this.permisos[modulo][permiso] = true;
          });
        });
        break;

      case "ADMIN_FABRICA":
        // Tiene todos los permisos pero solo para su fábrica
        Object.keys(this.permisos).forEach((modulo) => {
          Object.keys(this.permisos[modulo]).forEach((permiso) => {
            this.permisos[modulo][permiso] = true;
          });
        });
        break;

      case "COMPRADOR":
        // Permisos específicos para compradores
        this.permisos.compras = { ver: true, crear: true, editar: true };
        this.permisos.ordenesCompra = { ver: true, crear: true, editar: true };
        this.permisos.productos = { ver: true };
        this.permisos.proveedores = { ver: true };
        break;

      case "APROBADOR":
        // Permisos para aprobar compras y pagos
        this.permisos.compras = { ver: true, aprobar: true };
        this.permisos.ordenesCompra = { ver: true, aprobar: true };
        this.permisos.pagos = { ver: true, aprobar: true };
        break;
    }
  }
  next();
});

// Encriptar password antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para verificar permisos
userSchema.methods.hasPermission = function (modulo, permiso) {
  return this.permisos[modulo] && this.permisos[modulo][permiso];
};

const User = mongoose.model("User", userSchema);

export default User;
