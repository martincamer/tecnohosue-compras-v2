import { useState } from "react";
import styled from "styled-components";
import {
  ShoppingBag,
  Download,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Plus,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import clienteAxios from "../../config/axios";
import ModalFacturaOrdenCompraConvert from "./FormularioConvertirOrdenDeCompra";
import Modal from "../Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";

const TablaOrdenesCompra = ({
  ordenes = [],
  onAddOrder,
  onEdit,
  onDelete,
  onView,
  proveedor,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: "status",
    direction: "asc",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Fecha inválida";
      return format(date, "dd/MM/yyyy", { locale: es });
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "Error en fecha";
    }
  };

  const formatCurrency = (amount) => {
    try {
      if (!amount && amount !== 0) return "N/A";
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(amount);
    } catch (error) {
      console.error("Error al formatear moneda:", error);
      return "Error";
    }
  };

  const sortedOrdenes = [...ordenes].sort((a, b) => {
    if (sortConfig.key === "status") {
      const prioridad = {
        PENDIENTE: 0,
        COMPLETADA: 1,
        CANCELADA: 2,
      };

      const prioridadA = prioridad[a.status?.toUpperCase()] ?? 999;
      const prioridadB = prioridad[b.status?.toUpperCase()] ?? 999;

      return sortConfig.direction === "asc"
        ? prioridadA - prioridadB
        : prioridadB - prioridadA;
    }

    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getStatusText = (status) => {
    switch (status) {
      case "COMPLETADA":
        return "Completada";
      case "PENDIENTE":
        return "Pendiente";
      case "CANCELADA":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "COMPLETADA":
        return "success"; // verde
      case "PENDIENTE":
        return "warning"; // naranja
      case "CANCELADA":
        return "danger"; // rojo
      default:
        return "default";
    }
  };

  const handleOpenModal = (orden) => {
    console.log("Orden seleccionada:", orden); // Verifica que la orden se esté pasando correctamente
    setSelectedOrder(orden);
    setModalOpen(true);
  };

  const tableAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <Container>
      <Header>
        <Title>
          <ShoppingBag size={20} className="text-primary" />
          <span>Órdenes de Compra</span>
          <Badge>{ordenes.length}</Badge>
        </Title>
        <HeaderActions>
          <SearchInput
            type="text"
            placeholder="Buscar orden..."
            leftIcon={<Search size={16} />}
          />
          <ButtonGroup>
            <Button onClick={onAddOrder} className="primary-gradient">
              <Plus size={18} />
              Nueva Orden
            </Button>
            <Button variant="secondary">
              <Download size={18} />
              Exportar
            </Button>
          </ButtonGroup>
        </HeaderActions>
      </Header>

      <TableContainer>
        <AnimatePresence>
          {ordenes.length === 0 ? (
            <EmptyStateWrapper
              variants={tableAnimations}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EmptyStateIcon>
                <ShoppingBag size={40} />
              </EmptyStateIcon>
              <EmptyStateText>
                No hay órdenes de compra registradas
              </EmptyStateText>
              <Button onClick={onAddOrder} size="sm">
                Crear primera orden
              </Button>
            </EmptyStateWrapper>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th onClick={() => handleSort("orderNumber")}>Número</Th>
                  <Th onClick={() => handleSort("date")}>Fecha</Th>
                  <Th onClick={() => handleSort("deliveryDate")}>Entrega</Th>
                  <Th onClick={() => handleSort("total")}>Total</Th>
                  <Th onClick={() => handleSort("status")}>Estado</Th>
                  <Th>Acciones</Th>
                </tr>
              </thead>
              <tbody>
                {sortedOrdenes.map((orden, index) => (
                  <TableRow
                    key={orden._id}
                    as={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Td>{orden.orderNumber}</Td>
                    <Td>{formatDate(orden.date)}</Td>
                    <Td>{formatDate(orden.deliveryDate)}</Td>
                    <Td>{formatCurrency(orden.total)}</Td>
                    <Td>
                      <Status variant={getStatusVariant(orden.status)}>
                        {getStatusText(orden.status)}
                      </Status>
                    </Td>
                    <Td>
                      <ActionsWrapper>
                        <ActionButtonWithTooltip
                          variant="success"
                          disabled={
                            orden.status?.toUpperCase() === "COMPLETADA"
                          }
                          onClick={() => handleOpenModal(orden)}
                          tooltip="Crear factura"
                        >
                          <FileText size={16} />
                        </ActionButtonWithTooltip>
                        <ActionButtonWithTooltip
                          onClick={() => onView(orden)}
                          tooltip="Ver orden"
                        >
                          <Eye size={16} />
                        </ActionButtonWithTooltip>
                        <ActionButton onClick={() => onEdit(orden)}>
                          <Edit2 size={16} />
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => onDelete(orden)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </ActionsWrapper>
                    </Td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </AnimatePresence>
      </TableContainer>

      <Modal
        width="1600px"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ModalFacturaOrdenCompraConvert
          proveedor={proveedor}
          onClose={() => setModalOpen(false)}
          orden={selectedOrder}
        />
      </Modal>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
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

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "secondary"
      ? `
    color: #374151;
    background-color: white;
    border: 1px solid #d1d5db;
    &:hover {
      background-color: #f3f4f6;
      transform: translateY(-1px);
    }
  `
      : `
    color: white;
    background: linear-gradient(145deg, #3b82f6, #2563eb);
    border: none;
    &:hover {
      background: linear-gradient(145deg, #2563eb, #1d4ed8);
      transform: translateY(-1px);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #111827;
  border-top: 1px solid #e5e7eb;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.variant) {
      case "success":
        return `
          background: linear-gradient(145deg, #dcfce7, #bbf7d0);
          color: #166534;
        `;
      case "warning":
        return `
          background: linear-gradient(145deg, #ffedd5, #fed7aa);
          color: #9a3412;
        `;
      case "danger":
        return `
          background: linear-gradient(145deg, #fee2e2, #fecaca);
          color: #b91c1c;
        `;
      default:
        return `
          background: linear-gradient(145deg, #f3f4f6, #e5e7eb);
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
  color: ${(props) => {
    if (props.variant === "danger") return "#ef4444";
    if (props.variant === "success") return "#10b981";
    return "#6b7280";
  }};
  border-radius: 4px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: ${(props) => {
      if (props.variant === "danger") return "#dc2626";
      if (props.variant === "success") return "#059669";
      return "#111827";
    }};
    background-color: ${(props) => {
      if (props.variant === "danger") return "#fee2e2";
      if (props.variant === "success") return "#d1fae5";
      return "#f3f4f6";
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
`;

const SearchInput = styled.input`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  width: 300px;
  transition: all 0.2s;

  &:focus {
    background: white;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  .primary-gradient {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  }
`;

const Badge = styled.span`
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const TableRow = styled(motion.tr)`
  &:hover {
    background: #f8fafc;
  }
`;

const EmptyStateWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  gap: 1rem;
`;

const EmptyStateIcon = styled.div`
  color: #94a3b8;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 50%;
`;

const EmptyStateText = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  opacity: 0.7;
  transition: opacity 0.2s;

  tr:hover & {
    opacity: 1;
  }
`;

const ActionButtonWithTooltip = styled.button`
  position: relative;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
  color: ${(props) => (props.variant === "success" ? "#10b981" : "#6b7280")};

  &:hover::after {
    content: "${(props) => props.tooltip}";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #1f2937;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
    margin-bottom: 0.25rem;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.variant === "success" ? "#d1fae5" : "#f3f4f6"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default TablaOrdenesCompra;
