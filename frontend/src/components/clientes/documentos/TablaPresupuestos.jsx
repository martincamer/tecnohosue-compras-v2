import { useState } from "react";
import {
  Plus,
  FileText,
  Download,
  FileCheck,
  ClipboardList,
} from "lucide-react";
import Modal from "../../Modal/Modal";
import FormularioPresupuesto from "../formularios/FormularioPresupuesto";
import ModalVerPresupuesto from "./ModalVerPresupuesto";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TablaPresupuestos = ({ presupuestos, clienteId, cliente }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerPresupuesto, setShowVerPresupuesto] = useState(false);
  const [selectedPresupuesto, setSelectedPresupuesto] = useState(null);

  const getStatusVariant = (status) => {
    switch (status) {
      case "PENDIENTE":
        return "warning";
      case "APROBADO":
        return "success";
      case "RECHAZADO":
        return "error";
      case "FACTURADO":
        return "info";
      default:
        return "default";
    }
  };

  const handleVerPresupuesto = (presupuesto) => {
    setSelectedPresupuesto(presupuesto);
    setShowVerPresupuesto(true);
  };

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>
          <ClipboardList size={20} />
          Presupuestos
          <Badge>{presupuestos.length}</Badge>
        </Title>
        <HeaderActions>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Nuevo Presupuesto
          </Button>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variant="secondary"
          >
            <Download size={18} />
            Exportar
          </Button>
        </HeaderActions>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Número</Th>
              <Th>Fecha</Th>
              <Th align="right">Total</Th>
              <Th>Válido Hasta</Th>
              <Th>Estado</Th>
              <Th align="right">Acciones</Th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {presupuestos.length === 0 ? (
                <tr>
                  <EmptyState colSpan="6">
                    <ClipboardList size={40} strokeWidth={1.5} />
                    <p>No hay presupuestos registrados</p>
                    <Button onClick={() => setShowModal(true)}>
                      Crear primer presupuesto
                    </Button>
                  </EmptyState>
                </tr>
              ) : (
                presupuestos.map((presupuesto, index) => (
                  <TableRow
                    key={presupuesto._id}
                    as={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <Td>{presupuesto.quoteNumber}</Td>
                    <Td>{new Date(presupuesto.date).toLocaleDateString()}</Td>
                    <Td align="right">${presupuesto.total.toLocaleString()}</Td>
                    <Td>
                      {new Date(presupuesto.validUntil).toLocaleDateString()}
                    </Td>
                    <Td>
                      <StatusBadge
                        variant={getStatusVariant(presupuesto.status)}
                      >
                        {presupuesto.status}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <Actions>
                        <ActionButton
                          title="Ver presupuesto"
                          onClick={() => handleVerPresupuesto(presupuesto)}
                        >
                          <FileText size={18} />
                        </ActionButton>
                        {presupuesto.status === "APROBADO" && (
                          <ActionButton
                            title="Convertir a Factura"
                            variant="success"
                          >
                            <FileCheck size={18} />
                          </ActionButton>
                        )}
                      </Actions>
                    </Td>
                  </TableRow>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </Table>
      </TableContainer>

      {/* Modales */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nuevo Presupuesto"
        width="1500px"
      >
        <FormularioPresupuesto
          clienteId={clienteId}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      {showVerPresupuesto && (
        <Modal
          isOpen={showVerPresupuesto}
          onClose={() => setShowVerPresupuesto(false)}
          width="800px"
        >
          <ModalVerPresupuesto
            presupuesto={selectedPresupuesto}
            cliente={cliente}
            onClose={() => setShowVerPresupuesto(false)}
          />
        </Modal>
      )}
    </Container>
  );
};

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
      case "info":
        return `
          background-color: #dbeafe;
          color: #1e40af;
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
  color: ${(props) => {
    if (props.variant === "success") return "#059669";
    if (props.variant === "danger") return "#ef4444";
    return "#6b7280";
  }};
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => {
      if (props.variant === "success") return "#047857";
      if (props.variant === "danger") return "#dc2626";
      return "#111827";
    }};
    background-color: ${(props) => {
      if (props.variant === "success") return "#d1fae5";
      if (props.variant === "danger") return "#fee2e2";
      return "#f3f4f6";
    }};
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

export default TablaPresupuestos;
