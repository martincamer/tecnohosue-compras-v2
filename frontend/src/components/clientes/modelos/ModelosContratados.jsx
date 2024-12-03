import { useState } from "react";
import { Plus, X, Home } from "lucide-react";
import Modal from "../../Modal/Modal";
import ModalAgregarModelo from "./ModalAgregarModelo";
import { formatearDinero } from "../../../utils/formatearDinero";
import { motion, AnimatePresence } from "framer-motion";

const ModelosContratados = ({ cliente }) => {
  const [showModal, setShowModal] = useState(false);
  const [showImagenModal, setShowImagenModal] = useState(false);

  const handleSubmitModelo = async (formData) => {
    try {
      console.log("Modelo a guardar:", formData);
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar modelo:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 border rounded-2xl"
    >
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Home size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Modelo Contratado
              </h2>
              <p className="text-sm text-gray-500">
                Gestiona los detalles del modelo contratado
              </p>
            </div>
          </div>
          {!cliente.modeloContratado && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm"
            >
              <Plus size={18} />
              Contratar Modelo
            </motion.button>
          )}
        </div>
      </div>

      {cliente.modeloContratado ? (
        <div className="bg-white rounded-b-2xl border-t-0 shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src={cliente.modeloContratado.imagen}
              alt={cliente.modeloContratado.nombre}
              onClick={() => setShowImagenModal(true)}
              className="w-full h-[400px] object-cover cursor-zoom-in hover:opacity-95 transition-opacity duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-3xl font-bold text-white capitalize mb-2">
                {cliente.modeloContratado.nombre}
              </h3>
              <div className="flex items-center gap-4">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {formatearDinero(cliente.modeloContratado.precio_final)}
                </span>
                <span className="text-white/90 text-sm">
                  {new Date(
                    cliente.modeloContratado.fechaContrato
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Detalles del Contrato
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Forma de Pago</span>
                    <span className="font-medium text-gray-900">
                      {cliente.modeloContratado.forma_pago === "contado"
                        ? "Contado"
                        : cliente.modeloContratado.forma_pago ===
                          "anticipo_cuotas"
                        ? "Anticipo + Cuotas"
                        : cliente.modeloContratado.forma_pago ===
                          "contado_diferido"
                        ? "Contado Diferido"
                        : "Todo Financiado"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Fecha Contrato</span>
                    <span className="font-medium text-gray-900">
                      {new Date(
                        cliente.modeloContratado.fechaContrato
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {cliente.modeloContratado.forma_pago !== "contado" && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Detalles de Financiación
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Anticipo</span>
                      <span className="font-medium text-gray-900">
                        {cliente.modeloContratado.anticipo
                          ? formatearDinero(cliente.modeloContratado.anticipo)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Entrega x Cliente</span>
                      <span className="font-medium text-gray-900">
                        {cliente.modeloContratado.pagado
                          ? formatearDinero(cliente.modeloContratado.pagado)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Plan de Cuotas</span>
                      <span className="font-medium text-gray-900">
                        {cliente.modeloContratado.cuotas
                          ? `${cliente.modeloContratado.cuotas} cuotas de ${
                              cliente.modeloContratado.valor_cuota
                                ? formatearDinero(
                                    cliente.modeloContratado.valor_cuota
                                  )
                                : "N/A"
                            }`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Composición del Modelo
                <span className="text-sm font-normal text-gray-500">
                  {cliente.modeloContratado.composiciones
                    .reduce((total, comp) => total + comp.metrosCuadrados, 0)
                    .toFixed(2)}{" "}
                  m²
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cliente.modeloContratado.composiciones.map((comp, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {comp.articulo}
                      </h4>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                        {comp.metrosCuadrados.toFixed(2)}m²
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {comp?.ancho?.toFixed(2)}m x {comp.largo?.toFixed(2)}m
                    </p>
                    {comp.observaciones && (
                      <p className="text-sm text-gray-400 mt-2 italic">
                        {comp.observaciones}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {cliente.modeloContratado.observaciones && (
              <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-6">
                <h3 className="font-medium text-yellow-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Observaciones Generales
                </h3>
                <p className="text-yellow-700">
                  {cliente.modeloContratado.observaciones}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Home size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Sin Modelo Contratado
          </h3>
          <p className="text-gray-500 mb-6">
            No hay ningún modelo contratado para este cliente
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Contratar Modelo
          </motion.button>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Contratar Modelo"
        width="800px"
      >
        <ModalAgregarModelo
          clienteId={cliente._id}
          onSubmit={handleSubmitModelo}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      {showImagenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-75"
            onClick={() => setShowImagenModal(false)}
          />
          <div className="relative max-w-[90vw] max-h-[90vh] z-[51]">
            <button
              onClick={() => setShowImagenModal(false)}
              className="absolute -top-8 -right-8 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-900" />
            </button>
            <img
              src={cliente.modeloContratado.imagen}
              alt={cliente.modeloContratado.nombre}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ModelosContratados;
