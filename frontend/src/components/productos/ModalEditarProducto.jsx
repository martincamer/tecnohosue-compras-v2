import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCategorias } from "../../context/CategoriasContext";

export default function ModalEditarProducto({ isOpen, onClose, productoId }) {
  const { updateProducto, UNIDADES_MEDIDA, getProducto } = useProductos();
  const { categorias } = useCategorias();

  console.log(productoId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Obtener producto cuando se abre el modal
  useEffect(() => {
    const cargarProducto = async () => {
      if (isOpen && productoId) {
        const productoData = await getProducto(productoId);
        if (productoData) {
          setValue("nombre", productoData.nombre);
          setValue("descripcion", productoData.descripcion);
          setValue("precio", productoData.precio);
          setValue("unidadMedida", productoData.unidadMedida);
          setValue("categoria", productoData.categoria);
        }
      }
    };

    cargarProducto();
  }, [isOpen, productoId]);

  const onSubmit = async (data) => {
    try {
      const resultado = await updateProducto(productoId, data);
      if (resultado.success) {
        reset();
        onClose();
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
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
                      Editar Producto
                    </Dialog.Title>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {/* Nombre */}
                        <div className="col-span-2">
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Nombre del Producto
                          </label>
                          <input
                            type="text"
                            {...register("nombre", {
                              required: "El nombre es requerido",
                              minLength: {
                                value: 3,
                                message:
                                  "El nombre debe tener al menos 3 caracteres",
                              },
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.nombre && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.nombre.message}
                            </p>
                          )}
                        </div>

                        {/* Descripción */}
                        <div className="col-span-2">
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Descripción
                          </label>
                          <textarea
                            {...register("descripcion", {
                              required: "La descripción es requerida",
                            })}
                            rows={3}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          />
                          {errors.descripcion && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.descripcion.message}
                            </p>
                          )}
                        </div>

                        {/* Precio */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Precio
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                              <span className="text-gray-500 sm:text-sm">
                                $
                              </span>
                            </div>
                            <input
                              type="number"
                              step="0.01"
                              {...register("precio", {
                                required: "El precio es requerido",
                                min: {
                                  value: 0,
                                  message: "El precio debe ser mayor a 0",
                                },
                              })}
                              className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-7 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                            />
                          </div>
                          {errors.precio && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.precio.message}
                            </p>
                          )}
                        </div>

                        {/* Unidad de Medida */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Unidad de Medida
                          </label>
                          <select
                            {...register("unidadMedida", {
                              required: "La unidad de medida es requerida",
                            })}
                            className="block w-full rounded-xl border focus:border-[2px] border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          >
                            <option value="">Seleccionar unidad</option>
                            {UNIDADES_MEDIDA.map((unidad) => (
                              <option key={unidad.value} value={unidad.value}>
                                {unidad.label}
                              </option>
                            ))}
                          </select>
                          {errors.unidadMedida && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.unidadMedida.message}
                            </p>
                          )}
                        </div>

                        {/* Categoría */}
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Categoría
                          </label>
                          <select
                            {...register("categoria", {
                              required: "La categoría es requerida",
                            })}
                            className="block w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          >
                            <option value="">Seleccionar categoría</option>
                            {categorias?.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.nombre}
                              </option>
                            ))}
                          </select>
                          {errors.categoria && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.categoria.message}
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
                          Actualizar Producto
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
