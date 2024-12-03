import { useEffect, useState } from "react";
import { useClientes } from "../../../context/ClientesContext";
import { Plus, FileText, CircleDollarSign, Edit2 } from "lucide-react";
import { useProductos } from "../../../context/ProductosContext";
import Modal from "../../Modal/Modal";
import FormularioFactura from "../formularios/FormularioFactura";
import ModalVerFactura from "./ModalVerFactura";
import FormularioPago from "../../formularios/FormularioPago-not";
import FormularioEditarFactura from "../formularios/FormularioEditarFactura";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const Badge = styled.span`
  background: #e5e7eb;
  color: #374151;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-left: 0.5rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  ${(props) =>
    props.variant === "secondary"
      ? `
    color: #374151;
    background-color: white;
    border: 1px solid #d1d5db;
    &:hover {
      background-color: #f3f4f6;
      border-color: #9ca3af;
    }
  `
      : `
    color: white;
    background-color: #3b82f6;
    border: 1px solid transparent;
    &:hover {
      background-color: #2563eb;
    }
  `}

  &:active {
    transform: scale(0.98);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background-color: #f9fafb;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #111827;
  }

  ${(props) => props.align === "right" && "text-align: right;"}
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #111827;
  border-top: 1px solid #e5e7eb;

  ${(props) => props.align === "right" && "text-align: right;"}
  ${(props) => props.align === "center" && "text-align: center;"}
`;

const SortIndicator = styled.span`
  margin-left: 0.25rem;
  color: #3b82f6;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;

  ${(props) => {
    switch (props.variant) {
      case "success":
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case "warning":
        return `
          background-color: #fef9c3;
          color: #854d0e;
        `;
      case "error":
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 0.25rem;
  color: ${(props) => (props.variant === "danger" ? "#ef4444" : "#6b7280")};
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => (props.variant === "danger" ? "#dc2626" : "#111827")};
    background-color: ${(props) =>
      props.variant === "danger" ? "#fee2e2" : "#f3f4f6"};
  }
`;

const EmptyState = styled(Td)`
  padding: 3rem 1rem;
  text-align: center;
  color: #6b7280;

  p {
    margin: 0.5rem 0;
    font-size: 0.875rem;
  }

  svg {
    margin: 0 auto;
    color: #d1d5db;
  }
`;

const TableRow = styled.tr`
  transition: background-color 0.2s;
`;

const TablaFacturas = ({ facturas, clienteId, cliente }) => {
  const { TIPOS_FACTURA } = useClientes();
  const { productos, getProductos } = useProductos();
  const [showModal, setShowModal] = useState(false);
  const [showFacturaModal, setShowFacturaModal] = useState(false);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);

  const handleVerFactura = (factura) => {
    setSelectedFactura(factura);
    setShowFacturaModal(true);
  };

  const handlePagarFactura = (factura) => {
    setSelectedFactura(factura);
    setShowPagoModal(true);
  };

  const handleEditarFactura = (factura) => {
    setSelectedFactura(factura);
    setShowEditarModal(true);
  };

  useEffect(() => {
    getProductos();
  }, []);

  const sortedFacturas = facturas.sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-4">
        <Title>
          <FileText size={20} />
          Facturas Emitidas
          <Badge>{facturas.length}</Badge>
        </Title>
        <div className="flex gap-2">
          <Button
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Nueva Factura
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ref
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencimiento
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
            {sortedFacturas?.map((factura, index) => (
              <TableRow
                as={motion.tr}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: "#f9fafb" }}
                key={factura._id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {factura._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {
                    TIPOS_FACTURA.find((t) => t.value === factura.invoiceType)
                      ?.label
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div
                    title={factura.observation}
                    className="max-w-[200px] overflow-hidden text-ellipsis"
                  >
                    {factura.observation?.length > 30
                      ? factura.observation.substring(0, 30) + "..."
                      : factura.observation}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(factura.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-2">
                  <span className="text-gray-500">
                    {factura.dueDate &&
                      new Date(factura.dueDate).toLocaleDateString()}
                  </span>

                  {factura.paymentStatus !== "PAGADO" && factura.dueDate && (
                    <>
                      {new Date(factura.dueDate) < new Date() ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 font-medium uppercase">
                          Vencida
                        </span>
                      ) : (
                        new Date(factura.dueDate) <=
                          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                          <span className="px-2 py-1 text-xs rounded-full bg-orange-50 text-orange-600 font-medium uppercase">
                            Por vencer
                          </span>
                        )
                      )}
                    </>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  ${factura.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      factura.paymentStatus === "PAGADO"
                        ? "bg-green-100 text-green-800"
                        : factura.paymentStatus === "PARCIAL"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {factura.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-gray-400 hover:text-gray-900"
                    title="Ver Factura"
                    onClick={() => handleVerFactura(factura)}
                  >
                    <FileText size={20} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-green-500 ml-3"
                    title="Pagar Factura"
                    onClick={() => handlePagarFactura(factura)}
                  >
                    <CircleDollarSign size={20} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-900 ml-3"
                    title="Editar Factura"
                    onClick={() => handleEditarFactura(factura)}
                  >
                    <Edit2 size={18} />
                  </button>
                </td>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Nueva Factura */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nueva Factura"
        width="1200px"
      >
        <FormularioFactura
          clienteId={clienteId}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      {showFacturaModal && selectedFactura && (
        <Modal
          isOpen={showFacturaModal}
          onClose={() => setShowFacturaModal(false)}
          title={`Factura #${selectedFactura?.invoiceNumber}`}
          width="1200px"
        >
          <ModalVerFactura
            productos={productos}
            factura={selectedFactura}
            cliente={cliente}
            onClose={() => setShowFacturaModal(false)}
          />
        </Modal>
      )}

      {/* Modal para pagar factura */}
      {showPagoModal && selectedFactura && (
        <Modal
          isOpen={showPagoModal}
          onClose={() => setShowPagoModal(false)}
          title="Pagar Factura"
          width="600px"
        >
          <FormularioPago
            clienteId={clienteId}
            factura={selectedFactura}
            onClose={() => setShowPagoModal(false)}
          />
        </Modal>
      )}

      {/* Modal para editar factura */}
      {showEditarModal && selectedFactura && (
        <Modal
          isOpen={showEditarModal}
          onClose={() => setShowEditarModal(false)}
          title={`Editar Factura #${selectedFactura.invoiceNumber}`}
          width="1200px"
        >
          <FormularioEditarFactura
            clienteId={clienteId}
            factura={selectedFactura}
            onClose={() => setShowEditarModal(false)}
          />
        </Modal>
      )}
    </Container>
  );
};

export default TablaFacturas;
