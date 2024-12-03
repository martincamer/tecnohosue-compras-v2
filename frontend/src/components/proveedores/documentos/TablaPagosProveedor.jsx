import { useState } from "react";
import { useCompras } from "../../../context/ComprasContext";
import { Plus, FileText, Download, DollarSign, Search } from "lucide-react";
import Modal from "../../Modal/Modal";
import FormularioPagoProveedor from "../formularios/FormularioPagoProveedor";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TablaPagosProveedor = ({ pagos, proveedor, facturas }) => {
  const { METODOS_PAGO } = useCompras();
  const [showModal, setShowModal] = useState(false);
  const [showVerPago, setShowVerPago] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        <TitleWrapper>
          <IconWrapper>
            <DollarSign size={20} />
          </IconWrapper>
          <Title>Pagos Realizados</Title>
          <Badge>{pagos.length}</Badge>
        </TitleWrapper>

        <HeaderActions>
          <SearchWrapper>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Buscar pago..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          <ButtonGroup>
            <Button
              onClick={() => setShowModal(true)}
              className="primary-gradient"
            >
              <Plus size={18} />
              Nuevo Pago
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
          {pagos.length === 0 ? (
            <EmptyStateWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmptyStateIcon>
                <DollarSign size={40} />
              </EmptyStateIcon>
              <EmptyStateText>No hay pagos registrados</EmptyStateText>
              <Button onClick={() => setShowModal(true)} size="sm">
                Registrar primer pago
              </Button>
            </EmptyStateWrapper>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Número</Th>
                  <Th>Fecha</Th>
                  <Th>Método</Th>
                  <Th>Referencia</Th>
                  <Th align="right">Monto</Th>
                  <Th align="right">Acciones</Th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((pago, index) => (
                  <TableRow
                    key={pago._id}
                    as={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                    <Td align="right">
                      <Amount>${pago.amount.toLocaleString()}</Amount>
                    </Td>
                    <Td>
                      <ActionsWrapper>
                        <ActionButtonWithTooltip
                          onClick={() => handleVerPago(pago)}
                          tooltip="Ver detalles"
                        >
                          <FileText size={16} />
                        </ActionButtonWithTooltip>
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
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nuevo Pago"
        width="800px"
      >
        <FormularioPagoProveedor
          facturas={facturas}
          providerId={proveedor}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </Container>
  );
};

// Estilos modernos
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  color: white;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const Badge = styled.span`
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  width: 300px;
  transition: all 0.2s;

  &:focus {
    outline: none;
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
    background: white;
    border: 1px solid #d1d5db;
    &:hover {
      background: #f3f4f6;
    }
  `
      : `
    color: white;
    border: none;
    &:hover {
      transform: translateY(-1px);
    }
  `}
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
  text-align: ${(props) => props.align || "left"};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  background: #f9fafb;
`;

const Td = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
  text-align: ${(props) => props.align || "left"};
`;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background: #f8fafc;
  }
`;

const Amount = styled.span`
  font-weight: 600;
`;

const EmptyStateWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  color: #9ca3af;
  font-size: 40px;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const ActionButtonWithTooltip = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
  color: #374151;
  background: white;
  border: 1px solid #d1d5db;

  &:hover {
    background: #f3f4f6;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:before {
    content: "${(props) => props.tooltip}";
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #374151;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
  }

  &:hover:before {
    opacity: 1;
    visibility: visible;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default TablaPagosProveedor;
