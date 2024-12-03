import { useState } from "react";
import { useClientes } from "../../../context/ClientesContext";
import { Plus, FileText, Download, Wallet } from "lucide-react";
import Modal from "../../Modal/Modal";
import FormularioPago from "../formularios/FormularioPago";
import ModalVerPago from "./ModalVerPago";
import { formatearDinero } from "../../../utils/formatearDinero";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TablaPagos = ({ pagos, clienteId, cliente }) => {
  const { METODOS_PAGO } = useClientes();
  const [showModal, setShowModal] = useState(false);
  const [showVerPago, setShowVerPago] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);

  const handleVerPago = (pago) => {
    setSelectedPago(pago);
    setShowVerPago(true);
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
          <Wallet size={20} />
          Pagos Recibidos
          <Badge>{pagos.length}</Badge>
        </Title>
        <HeaderActions>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Nuevo Pago
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
              <Th>Método</Th>
              <Th>Referencia</Th>
              <Th align="right">Monto</Th>
              <Th>Estado</Th>
              <Th align="right">Acciones</Th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {pagos.length === 0 ? (
                <tr>
                  <EmptyState colSpan="7">
                    <Wallet size={40} strokeWidth={1.5} />
                    <p>No hay pagos registrados</p>
                    <Button onClick={() => setShowModal(true)}>
                      Registrar primer pago
                    </Button>
                  </EmptyState>
                </tr>
              ) : (
                pagos.map((pago, index) => (
                  <TableRow
                    key={pago._id}
                    as={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <Td>{pago.paymentNumber}</Td>
                    <Td>{new Date(pago.date).toLocaleDateString()}</Td>
                    <Td>
                      {
                        METODOS_PAGO.find((m) => m.value === pago.paymentMethod)
                          ?.label
                      }
                    </Td>
                    <Td>{pago.reference || "-"}</Td>
                    <Td align="right">{formatearDinero(pago.amount)}</Td>
                    <Td>
                      <StatusBadge variant="success">COMPLETADO</StatusBadge>
                    </Td>
                    <Td>
                      <Actions>
                        <ActionButton
                          title="Ver recibo"
                          onClick={() => handleVerPago(pago)}
                        >
                          <FileText size={18} />
                        </ActionButton>
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
        title="Nuevo Pago"
        width="600px"
      >
        <FormularioPago
          clienteId={clienteId}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      {showVerPago && (
        <Modal
          title={`Recibo #${selectedPago?.paymentNumber}`}
          isOpen={showVerPago}
          onClose={() => setShowVerPago(false)}
          width="800px"
        >
          <ModalVerPago
            pago={selectedPago}
            cliente={cliente}
            onClose={() => setShowVerPago(false)}
          />
        </Modal>
      )}
    </Container>
  );
};

// Estilos
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  color: #374151;
  background-color: white;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const EmptyState = styled.td`
  text-align: center;
  padding: 20px;
  color: #111827;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

export default TablaPagos;
