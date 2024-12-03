import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import clienteAxios from "../config/axios";
import Input from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import GoogleButton from "../components/ui/GoogleButton";

const Registro = () => {
  const { login } = useAuth();
  const [fabricas, setFabricas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFabricaModal, setShowFabricaModal] = useState(false);
  const [googleUserInfo, setGoogleUserInfo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    defaultValues: {
      username: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      fabrica: "",
      rol: "USUARIO",
    },
  });

  useEffect(() => {
    const fetchFabricas = async () => {
      try {
        const { data } = await clienteAxios.get("/fabricas");
        setFabricas(data.fabricas || []);
      } catch (error) {
        console.error("Error al cargar fábricas:", error);
        setFormError("root", {
          type: "manual",
          message: "Error al cargar las fábricas",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFabricas();
  }, []);

  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = await userInfoResponse.json();
        setGoogleUserInfo(userInfo);
        setShowFabricaModal(true);
      } catch (error) {
        setFormError("root", {
          type: "manual",
          message: "Error al obtener información de Google",
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

  const handleGoogleRegister = async (fabricaId) => {
    try {
      if (!googleUserInfo) return;

      const { data } = await clienteAxios.post("/users/google", {
        email: googleUserInfo.email,
        given_name: googleUserInfo.given_name,
        family_name: googleUserInfo.family_name,
        sub: googleUserInfo.sub,
        fabrica: fabricaId,
      });

      if (data.token) {
        login({
          token: data.token,
          user: data,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setFormError("root", {
        type: "manual",
        message:
          error.response?.data?.message || "Error al registrar con Google",
      });
    } finally {
      setShowFabricaModal(false);
      setGoogleUserInfo(null);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await clienteAxios.post("/users/register", formData);
      if (data.ok) {
        navigate("/login");
      }
    } catch (error) {
      setFormError("root", {
        type: "manual",
        message: error.response?.data?.message || "Error al registrar usuario",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://app.getbillage.com/saas/img/icons/backgrounds/pc_billage.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-500/80"></div>

        <div className="relative z-10">
          <div className="absolute top-8 left-8">
            <h2 className="text-white font-semibold text-2xl">
              Tecno Compras.
            </h2>
          </div>
          <div className="flex flex-col justify-center h-full px-20 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Bienvenido a nuestro Sistema de compras
            </h2>
            <p className="text-blue-100 text-lg">
              Gestiona tus proveedores de manera eficiente y profesional
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-6 flex justify-end">
          <Link
            to="/login"
            className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
          >
            Ya tengo cuenta
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <div className="mb-5 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>
              <p className="text-gray-500 mt-2">
                Completa el formulario para comenzar
              </p>
            </div>

            {errors.root && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Nombre"
                {...register("nombre", {
                  required: "El nombre es requerido",
                })}
                error={errors.nombre?.message}
              />
              <Input
                label="Apellido"
                {...register("apellido", {
                  required: "El apellido es requerido",
                })}
                error={errors.apellido?.message}
              />
              <Input
                label="Nombre de usuario"
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                })}
                error={errors.username?.message}
              />

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

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fábrica
                </label>
                <select
                  {...register("fabrica", {
                    required: "Debe seleccionar una fábrica",
                  })}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.fabrica ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione una fábrica</option>
                  {fabricas.map((fabrica) => (
                    <option key={fabrica._id} value={fabrica._id}>
                      {fabrica.nombre}
                    </option>
                  ))}
                </select>
                {errors.fabrica && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fabrica.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  {...register("rol", {
                    required: "Debe seleccionar un rol",
                  })}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.rol ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="USUARIO">Usuario</option>
                  <option value="COMPRADOR">Comprador</option>
                  <option value="APROBADOR">Aprobador</option>
                  <option value="ADMIN_FABRICA">
                    Administrador de Fábrica
                  </option>
                  <option value="SUPER_ADMIN">Super Administrador</option>
                </select>
                {errors.rol && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.rol.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Crear cuenta"}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-gray-500 text-sm">o</span>
                </div>
              </div>

              <GoogleButton
                text="Registrarse con Google"
                onClick={() => handleGoogleLogin()}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Modal de selección de fábrica */}
      {showFabricaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">Seleccionar Fábrica</h2>
            <p className="text-gray-600 mb-4">
              Para completar tu registro, selecciona la fábrica a la que
              perteneces:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {fabricas.map((fabrica) => (
                <button
                  key={fabrica._id}
                  onClick={() => handleGoogleRegister(fabrica._id)}
                  className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span className="flex-1">{fabrica.nombre}</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowFabricaModal(false);
                setGoogleUserInfo(null);
              }}
              className="mt-4 w-full py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;
