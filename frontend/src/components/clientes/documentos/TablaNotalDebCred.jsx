import { useState } from "react";
import { useClientes } from "../../../context/ClientesContext";
import { Plus, FileText, Download, FileEdit } from "lucide-react";
import Modal from "../../Modal/Modal";
import FormularioNotaDebCred from "../formularios/FormularioNotaDebCred";
import { motion } from "framer-motion";

const TablaNotalDebCred = ({ notas = [], clienteId }) => {
  const { TIPOS_NOTA } = useClientes();
  const [showModal, setShowModal] = useState(false);
  const [showNotaModal, setShowNotaModal] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);

  const handleVerNota = (nota) => {
    setSelectedNota(nota);
    setShowNotaModal(true);
  };

  const getEstadoLabel = (status) => {
    const estados = {
      PENDIENTE: "Pendiente",
      APLICADO: "Aplicada",
      ANULADO: "Anulada",
    };
    return estados[status] || status;
  };

  const getEstadoClase = (status) => {
    const clases = {
      PENDIENTE: "bg-yellow-100 text-yellow-800",
      APLICADO: "bg-green-100 text-green-800",
      ANULADO: "bg-red-100 text-red-800",
    };
    return clases[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FileEdit size={20} className="text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">
            Notas de Débito/Crédito
          </h3>
          <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {notas.length}
          </span>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nueva Nota
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Exportar
          </motion.button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Factura Asociada
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notas.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <FileEdit size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">
                    No hay notas registradas
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Crear primera nota
                  </motion.button>
                </td>
              </tr>
            ) : (
              notas?.map((nota, index) => (
                <motion.tr
                  key={nota._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {nota.noteNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {TIPOS_NOTA.find((t) => t.value === nota.noteType)?.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nota.relatedInvoice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(nota.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    ${(nota.total || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getEstadoClase(
                        nota.status
                      )}`}
                    >
                      {getEstadoLabel(nota.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-900 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Ver Nota"
                      onClick={() => handleVerNota(nota)}
                    >
                      <FileText size={18} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-900 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Descargar"
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Nueva Nota */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nueva Nota de Débito/Crédito"
        width="1200px"
      >
        <FormularioNotaDebCred
          clienteId={clienteId}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </motion.div>
  );
};

export default TablaNotalDebCred;
