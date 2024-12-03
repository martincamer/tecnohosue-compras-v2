import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Lock,
  Edit2,
  Save,
  X,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";

const Perfil = () => {
  const { auth, actualizarPerfil, actualizarPassword } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      nombre: auth.user.nombre,
      email: auth.user.email,
      telefono: auth.user.telefono || "",
      empresa: auth.user.empresa || "",
      direccion: auth.user.direccion || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await actualizarPerfil(data);
      setEditMode(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    }
  };

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      await actualizarPassword(data);
      setChangePassword(false);
      toast.success("Contraseña actualizada correctamente");
      reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Error al actualizar la contraseña");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="p-3 bg-blue-500/10 rounded-xl"
            >
              <User className="text-blue-500" size={24} />
            </motion.div>
            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800"
              >
                Mi Perfil
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-500 mt-1"
              >
                Gestiona tu información personal y preferencias
              </motion.p>
            </div>
          </div>

          {!editMode && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Edit2 size={16} />
              <span>Editar Perfil</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Foto de Perfil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-1"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={auth.user.avatar || "https://via.placeholder.com/128"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg"
              >
                <Camera size={16} />
              </motion.button>
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-800">
              {auth.user.nombre}
            </h3>
            <p className="text-center text-sm text-gray-500">
              {auth.user.email}
            </p>
          </div>
        </motion.div>

        {/* Formulario Principal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-2"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Información Personal
              </h2>

              {/* Campos del formulario */}
              <div className="space-y-4">
                <FieldGroup
                  icon={<User className="text-gray-400" />}
                  label="Nombre"
                  error={errors.nombre}
                >
                  {editMode ? (
                    <input
                      {...register("nombre", {
                        required: "El nombre es requerido",
                      })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.nombre ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ) : (
                    <div className="text-gray-700">{auth.user.nombre}</div>
                  )}
                </FieldGroup>

                <FieldGroup
                  icon={<Mail className="text-gray-400" />}
                  label="Email"
                  error={errors.email}
                >
                  {editMode ? (
                    <input
                      {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ) : (
                    <div className="text-gray-700">{auth.user.email}</div>
                  )}
                </FieldGroup>

                {/* Botones de acción */}
                <AnimatePresence>
                  {editMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-3 mt-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Save size={16} />
                        <span>Guardar Cambios</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X size={16} />
                        <span>Cancelar</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>

          {/* Sección de Contraseña */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Contraseña
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChangePassword(!changePassword)}
                className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Lock size={16} />
                <span>Cambiar Contraseña</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {changePassword && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  {/* Campos de contraseña */}
                  {/* ... */}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FieldGroup = ({ icon, label, children, error }) => (
  <div className="relative">
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {children}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {error.message}
          </motion.p>
        )}
      </div>
    </div>
  </div>
);

export default Perfil;
