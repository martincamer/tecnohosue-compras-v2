import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import Input from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import GoogleButton from "../components/ui/GoogleButton";
import clienteAxios from "../config/clienteAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Gestión Ecommerce";
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Obtener información del usuario de Google
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = await userInfoResponse.json();
        console.log(userInfo); // Imprimir para depuración

        // Verificar que se haya obtenido el email
        if (!userInfo.email) {
          setFormError("root", {
            type: "manual",
            message: "No se pudo obtener el email del usuario de Google",
          });
          return;
        }

        // Enviar datos al backend
        const { data } = await clienteAxios.post("/users/login-google", {
          email: userInfo.email,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
          sub: userInfo.sub,
        });

        // Si el login fue exitoso
        if (data.token) {
          login({
            token: data.token,
            user: {
              _id: data._id,
              username: data.username,
              nombre: data.nombre,
              apellido: data.apellido,
              email: data.email,
              permisos: data.permisos,
            },
          });

          navigate("/dashboard");
        }
      } catch (error) {
        setFormError("root", {
          type: "manual",
          message:
            error.response?.data?.message ||
            "Error al iniciar sesión con Google",
        });
      }
    },
    onError: () => {
      setFormError("root", {
        type: "manual",
        message: "Error al conectar con Google",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setFormError("root", {
          type: "manual",
          message: response.message || "Error al iniciar sesión",
        });
      }
    } catch (error) {
      setFormError("root", {
        type: "manual",
        message: "Error al conectar con el servidor",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://app.getbillage.com/saas/img/icons/backgrounds/pc_billage.jpg')",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90"
        />

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-8 left-8"
          >
            <h2 className="text-white font-semibold text-2xl">
              Tecnohouse Compras.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col justify-center h-screen px-20 text-white"
          >
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              ¡Bienvenido <br />
              de nuevo!
            </h2>
            <p className="text-blue-100 text-xl">
              Accede a tu cuenta para gestionar tus compras.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Panel Derecho */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex flex-col bg-gray-50"
      >
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Iniciar Sesión
              </h1>
              <p className="text-gray-500">
                Ingresa tus credenciales para continuar
              </p>
            </motion.div>

            {errors.root && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl shadow-sm"
              >
                {errors.root.message}
              </motion.div>
            )}

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <Input
                label="Email"
                type="email"
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                error={errors.email?.message}
              />

              <InputPassword
                label="Contraseña"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
                error={errors.password?.message}
              />

              <motion.div whileHover={{ x: 5 }} className="flex justify-end">
                <Link
                  to="/recuperar-password"
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </motion.div>

              <div className="pt-3 space-y-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  Iniciar Sesión
                </motion.button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-gray-50 px-4 text-gray-500 text-sm">
                      o continúa con
                    </span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GoogleButton
                    onClick={() => handleGoogleLogin()}
                    text="Iniciar sesión con Google"
                  />
                </motion.div>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
