import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "El email es obligatorio",
    "string.email": "El email no es válido",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña es obligatoria",
  }),
});

export const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "El nombre de usuario es obligatorio",
  }),
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre es obligatorio",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido es obligatorio",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email es obligatorio",
    "string.email": "El email no es válido",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
  fabrica: Joi.string().required().messages({
    "string.empty": "La fábrica es obligatoria",
    "string.base": "La fábrica debe ser un ID válido",
  }),
  rol: Joi.string()
    .valid("SUPER_ADMIN", "ADMIN_FABRICA", "COMPRADOR", "APROBADOR", "USUARIO")
    .required()
    .messages({
      "string.empty": "El rol es obligatorio",
      "any.only":
        "El rol debe ser uno de los siguientes: SUPER_ADMIN, ADMIN_FABRICA, COMPRADOR, APROBADOR o USUARIO",
    }),
});
