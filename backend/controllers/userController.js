import User from "../models/User.js";

import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import { Fabrica } from "../models/Fabrica.js";

// Generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Registrar usuario
const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { username, nombre, apellido, email, fabrica, password, rol } =
      req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({
        message:
          userExists.email === email
            ? "Ya existe una cuenta con este email"
            : "El nombre de usuario ya está en uso",
      });
    }

    // Verificar si la fábrica existe - Agregamos un log para debug
    console.log("Buscando fábrica con ID:", fabrica);
    const fabricaExists = await Fabrica.findById(fabrica);
    console.log("Fábrica encontrada:", fabricaExists);

    if (!fabricaExists) {
      return res.status(400).json({
        message: `La fábrica con ID ${fabrica} no existe en la base de datos`,
      });
    }

    // Si todo está bien, crear el usuario
    const user = await User.create({
      username,
      nombre,
      apellido,
      email,
      password,
      fabrica: fabricaExists._id, // Usamos el ID de la fábrica que encontramos
      rol: rol || "USUARIO",
      enLinea: true,
      ultimaConexion: new Date(),
    });

    const token = generateToken(user._id);

    res.status(201).json({
      ok: true,
      user: {
        _id: user._id,
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        fabrica: user.fabrica,
        rol: user.rol,
        permisos: user.permisos,
      },
      token,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Login usuario
const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("fabrica", "nombre");
    if (!user) {
      return res.status(401).json({
        message: "No existe una cuenta con este email",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "La contraseña es incorrecta",
      });
    }

    // Actualizar estado de conexión
    user.enLinea = true;
    user.ultimaConexion = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      ok: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fabrica: user.fabrica,
        rol: user.rol,
        permisos: user.permisos,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
};

// Obtener perfil de usuario
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// Login con Google
const loginWithGoogle = async (req, res) => {
  try {
    console.log(req.body);

    const { email, sub, given_name, family_name } = req.body;

    if (!email) {
      return res.status(400).json({
        ok: false,
        message: "No se pudo obtener el email del usuario de Google",
      });
    }

    // Verificar si el usuario existe
    let user = await User.findOne({ email });

    if (!user) {
      // Si no existe, crear un nuevo usuario
      user = await User.create({
        username: email.split("@")[0],
        nombre: given_name,
        apellido: family_name,
        email,
        googleId: sub,
        verificado: true,
        rol: "USER",
        password: Math.random().toString(36).slice(-8), // Contraseña aleatoria
      });
    }

    // Generar token para el usuario
    const userToken = generateToken(user._id);

    res.json({
      ok: true,
      _id: user._id,
      username: user.username,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol,
      permisos: user.permisos,
      token: userToken,
    });
  } catch (error) {
    console.error("Error en login con Google:", error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Registrar con Google
const registerWithGoogle = async (req, res) => {
  try {
    const { email, given_name, family_name, sub, sucursal } = req.body;

    // Verificar si se proporcionó una sucursal
    if (!sucursal) {
      return res.status(400).json({
        ok: false,
        message: "La sucursal es obligatoria",
      });
    }

    // Verificar si la sucursal existe
    const sucursalExists = await Sucursal.findById(sucursal);
    if (!sucursalExists) {
      return res.status(400).json({
        ok: false,
        message: "La sucursal especificada no existe",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      // Si el usuario existe, actualizar sus datos si es necesario
      user.nombre = given_name;
      user.apellido = family_name;
      user.googleId = sub;
      user.verificado = true;
      await user.save();
    } else {
      // Crear nuevo usuario
      user = await User.create({
        username: email.split("@")[0],
        nombre: given_name,
        apellido: family_name,
        email,
        googleId: sub,
        verificado: true,
        sucursal, // Agregar sucursal
        rol: "USER",
        password: "tecnooperaciones_2024", // Contraseña aleatoria
      });

      // // Crear banco para el usuario
      // const bank = new Bank({
      //   user: user._id,
      //   accountNumber: `${Date.now()}`,
      //   bankName: "Banco Principal",
      //   accountType: "CORRIENTE",
      //   balance: 0,
      //   transactions: [],
      // });

      // await bank.save();
    }

    // Generar token
    const token = generateToken(user._id);

    res.json({
      ok: true,
      _id: user._id,
      username: user.username,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      sucursal: user.sucursal,
      rol: user.rol,
      permisos: user.permisos,
      sucursal: user.sucursal,
      token,
    });
  } catch (error) {
    console.error("Error en registro con Google:", error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Obtener permisos de un usuario
const getUserPermissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "permisos rol username email"
    );

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    // Verificar que el usuario que hace la petición sea ADMIN
    if (req.user.rol !== "ADMIN") {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para ver esta información",
      });
    }

    res.json({
      ok: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        rol: user.rol,
        permisos: user.permisos,
      },
    });
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener los permisos",
    });
  }
};

// Actualizar permisos de un usuario
const updateUserPermissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permisos, rol } = req.body;

    // Verificar que el usuario que hace la petición sea SUPER_ADMIN o ADMIN_FABRICA
    if (!["SUPER_ADMIN", "ADMIN_FABRICA"].includes(req.user.rol)) {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para realizar esta acción",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    // Si es ADMIN_FABRICA, solo puede modificar usuarios de su misma fábrica
    if (
      req.user.rol === "ADMIN_FABRICA" &&
      user.fabrica.toString() !== req.user.fabrica.toString()
    ) {
      return res.status(403).json({
        ok: false,
        message: "Solo puedes modificar usuarios de tu propia fábrica",
      });
    }

    // Validar estructura de permisos
    const permisosValidos = [
      "compras",
      "ordenesCompra",
      "facturas",
      "pagos",
      "productos",
      "proveedores",
      "reportes",
    ];

    const accionesValidas = [
      "ver",
      "acceso",
      "crear",
      "editar",
      "eliminar",
      "aprobar",
    ];

    // Validar que los permisos enviados sean válidos
    for (const modulo in permisos) {
      if (!permisosValidos.includes(modulo)) {
        return res.status(400).json({
          ok: false,
          message: `El módulo ${modulo} no es válido. Módulos válidos: ${permisosValidos.join(
            ", "
          )}`,
        });
      }

      for (const accion in permisos[modulo]) {
        if (!accionesValidas.includes(accion)) {
          return res.status(400).json({
            ok: false,
            message: `La acción ${accion} no es válida`,
          });
        }

        if (typeof permisos[modulo][accion] !== "boolean") {
          return res.status(400).json({
            ok: false,
            message: `El valor de ${modulo}.${accion} debe ser booleano`,
          });
        }
      }
    }

    // Validar rol
    const rolesValidos = [
      "SUPER_ADMIN",
      "ADMIN_FABRICA",
      "COMPRADOR",
      "APROBADOR",
      "USUARIO",
    ];
    if (rol && !rolesValidos.includes(rol)) {
      return res.status(400).json({
        ok: false,
        message: "El rol especificado no es válido",
      });
    }

    // Actualizar permisos y rol
    if (permisos) {
      user.permisos = {
        ...user.permisos,
        ...permisos,
      };
    }

    if (rol) {
      user.rol = rol;
    }

    await user.save();

    res.json({
      ok: true,
      message: "Permisos actualizados correctamente",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        rol: user.rol,
        permisos: user.permisos,
        fabrica: user.fabrica,
      },
    });
  } catch (error) {
    console.error("Error al actualizar permisos:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar los permisos",
    });
  }
};

// Obtener todos los usuarios con sus permisos
const getAllUsersPermissions = async (req, res) => {
  try {
    if (!["SUPER_ADMIN", "ADMIN_FABRICA"].includes(req.user.rol)) {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para ver esta información",
      });
    }

    let query = {};
    if (req.user.rol === "ADMIN_FABRICA") {
      query.fabrica = req.user.fabrica;
    }

    const users = await User.find(query)
      .select(
        "username email rol permisos fabrica nombre apellido enLinea ultimaConexion"
      )
      .populate("fabrica", "nombre");

    // Calcular tiempo desde última conexión
    const usersWithStatus = users.map((user) => ({
      ...user.toObject(),
      tiempoDesdeUltimaConexion: user.ultimaConexion
        ? Math.floor((new Date() - user.ultimaConexion) / 1000 / 60)
        : null, // en minutos
    }));

    res.json({
      ok: true,
      users: usersWithStatus,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener la lista de usuarios",
      error: error.message,
    });
  }
};

// Actualizar estado de conexión
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    user.enLinea = status;
    user.ultimaConexion = new Date();
    await user.save();

    res.json({
      ok: true,
      message: `Usuario ${status ? "conectado" : "desconectado"} correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar estado del usuario",
    });
  }
};

export {
  register,
  login,
  getProfile,
  registerWithGoogle,
  getUserPermissions,
  updateUserPermissions,
  getAllUsersPermissions,
  loginWithGoogle,
  updateUserStatus,
};
