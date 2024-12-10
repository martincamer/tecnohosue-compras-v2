import { useState, useEffect } from "react";
import { useProductos } from "../context/ProductosContext";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Download,
  Upload,
  ChevronDown,
  AlertCircle,
  Package,
} from "lucide-react";

import useModal from "../hooks/useModal";
import ModalEliminarProducto from "../components/productos/ModalEliminarProducto";
import { formatearDinero } from "../utils/formatearDinero";
import { motion } from "framer-motion";
import ModalProducto from "../components/productos/ModalProducto";
import ModalEditarProducto from "../components/productos/ModalEditarProducto";

// Componente para la tabla moderna
const TablaProductos = ({
  loading,
  productosFiltrados,
  handleEdit,
  handleDeleteClick,
  UNIDADES_MEDIDA,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 bg-gray-50/50">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </div>
              </th>
              <th className="px-6 py-4 bg-gray-50/50">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </div>
              </th>
              <th className="px-6 py-4 bg-gray-50/50">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidad
                </div>
              </th>
              <th className="px-6 py-4 bg-gray-50/50">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </div>
              </th>
              <th className="px-6 py-4 bg-gray-50/50">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </div>
              </th>
              <th className="px-6 py-4 bg-gray-50/50">
                <div className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan="6">
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="text-sm text-gray-500">
                        Cargando productos...
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : !productosFiltrados.length ? (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-col items-center justify-center h-32 gap-2">
                    <AlertCircle className="text-gray-400" size={24} />
                    <span className="text-sm text-gray-500">
                      No se encontraron productos
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              productosFiltrados.map((producto, index) => (
                <motion.tr
                  key={producto._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-gray-50/50 transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 mr-4">
                        <div className="h-full w-full rounded-lg bg-blue-50 flex items-center justify-center">
                          <Package size={16} className="text-blue-500" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {producto.nombre}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {producto._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {producto.unidadMedida}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {
                        UNIDADES_MEDIDA.find(
                          (u) => u.value === producto.unidadMedida
                        )?.label
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatearDinero(producto.precio)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        producto.estado
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {producto.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        onClick={() => handleEdit(producto)}
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        onClick={() => handleDeleteClick(producto)}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const Productos = () => {
  const {
    productos,
    loading,
    getProductos,
    deleteProducto,
    TIPOS_PRODUCTO,
    UNIDADES_MEDIDA,
  } = useProductos();

  const [searchTerm, setSearchTerm] = useState("");
  const [filtros, setFiltros] = useState({
    tipo: "",
    unidad: "",
    estado: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productoIdEditar, setProductoIdEditar] = useState(null);
  const [productoEliminar, setProductoEliminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  // Configurar modales
  const { modalStates, openModal, closeModal } = useModal([
    "createProduct",
    "editProduct",
    "deleteProduct",
  ]);

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    if (!Array.isArray(productos)) return;

    const filtered = productos.filter((producto) => {
      if (!producto) return false;

      const matchSearch = producto.nombre
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchTipo = !filtros.tipo || producto.tipo === filtros.tipo;
      const matchUnidad =
        !filtros.unidadMedida || producto.unidadMedida === filtros.unidad;
      const matchEstado =
        !filtros.estado ||
        (filtros.estado === "active" ? producto.estado : !producto.estado);

      return matchSearch && matchTipo && matchUnidad && matchEstado;
    });

    setProductosFiltrados(filtered);
  }, [searchTerm, filtros, productos]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProducto(id);
    }
  };

  const handleEdit = (producto) => {
    setProductoEditar(producto._id);
    openModal("editProduct");
  };

  const handleCloseEdit = () => {
    setProductoEditar(null);
    closeModal("editProduct");
  };

  const handleDeleteClick = (producto) => {
    setProductoEliminar(producto);
    openModal("deleteProduct");
  };

  const handleConfirmDelete = async (id) => {
    const result = await deleteProducto(id);
    if (result.success) {
      setProductoEliminar(null);
      closeModal("deleteProduct");
    }
  };

  const handleCancelDelete = () => {
    setProductoEliminar(null);
    closeModal("deleteProduct");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header con gradiente y sombra */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="p-3 bg-blue-500/10 rounded-xl"
            >
              <Package className="text-blue-500" size={24} />
            </motion.div>
            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900"
              >
                Productos
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-sm mt-1"
              >
                Gestiona tu catálogo de productos y servicios
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-500/20"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} />
              Nuevo Producto
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <Download size={18} />
                Exportar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <Upload size={18} />
                Importar
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Buscador y Filtros con diseño mejorado */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              showFilters
                ? "bg-gray-100 text-gray-900"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter size={18} />
            Filtros
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <TablaProductos
        loading={loading}
        productosFiltrados={productosFiltrados}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
        UNIDADES_MEDIDA={UNIDADES_MEDIDA}
      />

      {/* Modal Crear Producto */}
      <ModalProducto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modal Editar Producto */}
      <ModalEditarProducto
        isOpen={modalStates.editProduct}
        onClose={handleCloseEdit}
        productoId={productoEditar}
      />

      {/* Modal Eliminar Producto */}
      <ModalEliminarProducto
        isOpen={modalStates.deleteProduct}
        onClose={handleCancelDelete}
        producto={productoEliminar}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Productos;
