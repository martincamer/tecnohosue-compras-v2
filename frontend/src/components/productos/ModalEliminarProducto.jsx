import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ModalEliminarProducto = ({ isOpen, onClose, producto, onConfirm }) => {
  if (!producto) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/25 backdrop-blur-sm transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ring-1 ring-black/5">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-20 sm:w-20">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2,
                      }}
                    >
                      <ExclamationTriangleIcon
                        className="h-12 w-12 text-red-600"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900"
                    >
                      Eliminar Producto
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar el producto{" "}
                        <span className="font-semibold text-gray-900">
                          {producto.nombre}
                        </span>
                        ? Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 bg-gray-50/50 rounded-xl p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800">
                        Atención
                      </h3>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>
                          Esta acción eliminará permanentemente el producto y
                          todos sus datos asociados. Los registros históricos se
                          mantendrán pero el producto no estará disponible para
                          nuevas operaciones.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex justify-end gap-3"
                >
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-all duration-200"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200"
                    onClick={() => {
                      onConfirm(producto._id);
                      onClose();
                    }}
                  >
                    Eliminar Producto
                  </button>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalEliminarProducto;
