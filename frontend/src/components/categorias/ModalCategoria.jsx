import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCategorias } from "../../context/CategoriasContext";

export default function ModalCategoria({ isOpen, onClose }) {
  const { createCategoria } = useCategorias();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createCategoria(data);
      if (response.success) {
        reset();
        onClose();
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
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
          <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-SM transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white backdrop-blur-xl px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ring-1 ring-black/5">
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
                      Crear Nueva Categoría
                    </Dialog.Title>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                          Nombre de la Categoría
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
                          className="block w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm"
                          placeholder="Ingrese el nombre de la categoría"
                        />
                        {errors.nombre && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.nombre.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                          Descripción
                        </label>
                        <textarea
                          {...register("descripcion")}
                          rows={3}
                          className="block w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 transition-all duration-200 text-gray-700 text-sm resize-none"
                          placeholder="Ingrese una descripción (opcional)"
                        />
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
                          Crear Categoría
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
