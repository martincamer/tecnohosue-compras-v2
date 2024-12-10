import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clienteAxios from "../../config/axios";
import toast from "react-hot-toast";

export default function ModalUsuario({ isOpen, onClose, onUserCreated }) {
  const [fabricas, setFabricas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rol: "USUARIO",
      fabrica: "",
    },
  });

  // Obtener fábricas al montar el componente
  useEffect(() => {
    const getFabricas = async () => {
      try {
        const { data } = await clienteAxios.get("/fabricas");
        // Asegurarnos de que estamos usando el array de fábricas correcto
        setFabricas(data.fabricas || []); // Asumiendo que la respuesta tiene una propiedad 'fabricas'
      } catch (error) {
        console.error("Error al obtener fábricas:", error);
        toast.error("Error al cargar las fábricas");
        setFabricas([]); // Asegurarnos de que siempre sea un array
      }
    };

    if (isOpen) {
      getFabricas();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const response = await clienteAxios.post("/users/register", data);
      if (response.data.ok) {
        toast.success("Usuario creado correctamente");
        reset();
        onClose();
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      toast.error(error.response?.data?.message || "Error al crear usuario");
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white backdrop-blur-xl px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 ring-1 ring-black/5">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-lg bg-white/50 backdrop-blur-sm p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:bg-white/80"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900 mb-8"
                    >
                      Crear Nuevo Usuario
                    </Dialog.Title>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {/* Username */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Nombre de Usuario
                          </label>
                          <input
                            type="text"
                            {...register("username", {
                              required: "El nombre de usuario es requerido",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres",
                              },
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.username && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.username.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            {...register("email", {
                              required: "El email es requerido",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido",
                              },
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Nombre */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Nombre
                          </label>
                          <input
                            type="text"
                            {...register("nombre", {
                              required: "El nombre es requerido",
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.nombre && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.nombre.message}
                            </p>
                          )}
                        </div>

                        {/* Apellido */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Apellido
                          </label>
                          <input
                            type="text"
                            {...register("apellido", {
                              required: "El apellido es requerido",
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.apellido && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.apellido.message}
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            {...register("password", {
                              required: "La contraseña es requerida",
                              minLength: {
                                value: 6,
                                message: "Mínimo 6 caracteres",
                              },
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.password && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        {/* Fábrica Select */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Fábrica
                          </label>
                          <select
                            {...register("fabrica", {
                              required: "Debe seleccionar una fábrica",
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          >
                            <option value="">Seleccionar fábrica</option>
                            {fabricas?.map((fabrica) => (
                              <option key={fabrica._id} value={fabrica._id}>
                                {fabrica.nombre}
                              </option>
                            ))}
                          </select>
                          {errors.fabrica && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.fabrica.message}
                            </p>
                          )}
                        </div>

                        {/* Rol Select - Actualizado con validación */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Rol
                          </label>
                          <select
                            {...register("rol", {
                              required: "Debe seleccionar un rol",
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          >
                            <option value="">Seleccionar rol</option>
                            <option value="USUARIO">Usuario</option>
                            <option value="ADMIN_FABRICA">Admin Fábrica</option>
                            <option value="COMPRADOR">Comprador</option>
                            <option value="APROBADOR">Aprobador</option>
                          </select>
                          {errors.rol && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.rol.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end gap-3">
                        <button
                          type="button"
                          className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                          onClick={onClose}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                        >
                          Crear Usuario
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
