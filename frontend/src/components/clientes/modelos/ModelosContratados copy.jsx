import { useState } from "react";
import { Plus, X } from "lucide-react";
import Modal from "../../Modal/Modal";
import ModalAgregarModelo from "./ModalAgregarModelo";
import styled from "styled-components";

const ModelosContratados = ({ cliente }) => {
  const [showModal, setShowModal] = useState(false);
  const [showImagenModal, setShowImagenModal] = useState(false);

  console.log(cliente.modeloContratado);

  const handleSubmitModelo = async (formData) => {
    try {
      console.log("Modelo a guardar:", formData);
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar modelo:", error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Modelo Contratado</Title>
        {!cliente.modeloContratado && (
          <AddButton type="button" onClick={() => setShowModal(true)}>
            <Plus size={20} />
            Contratar Modelo
          </AddButton>
        )}
      </Header>

      {cliente.modeloContratado ? (
        <ModeloCard>
          <ModeloHeader>
            <ModeloInfo>
              <ModeloTitle>{cliente.modeloContratado.nombre}</ModeloTitle>
              <ModeloImagen
                src={cliente.modeloContratado.imagen}
                alt={cliente.modeloContratado.nombre}
                onClick={() => setShowImagenModal(true)}
                style={{ cursor: "pointer" }}
              />
            </ModeloInfo>
            <ModeloPrecio>
              <PrecioLabel>Precio Final</PrecioLabel>
              <PrecioValue>
                ${cliente.modeloContratado.precio_final.toLocaleString()}
              </PrecioValue>
            </ModeloPrecio>
          </ModeloHeader>

          <GridContainer>
            <Section>
              <SectionTitle>Detalles del Contrato</SectionTitle>
              <InfoList>
                <InfoItem
                  label="Fecha Contrato"
                  value={new Date(
                    cliente.modeloContratado.fechaContrato
                  ).toLocaleDateString()}
                />
                <InfoItem
                  label="Forma de Pago"
                  value={
                    cliente.modeloContratado.forma_pago === "financiado"
                      ? "Financiado"
                      : "Contado"
                  }
                />
              </InfoList>
            </Section>

            {cliente.modeloContratado.forma_pago === "financiado" && (
              <Section>
                <SectionTitle>Detalles de Financiación</SectionTitle>
                <InfoList>
                  <InfoItem
                    label="Anticipo"
                    value={`$${cliente.modeloContratado.anticipo.toLocaleString()}`}
                  />
                  <InfoItem
                    label="Plan de Cuotas"
                    value={`${
                      cliente.modeloContratado.cuotas
                    } cuotas de $${cliente.modeloContratado.valor_cuota.toLocaleString()}`}
                  />
                </InfoList>
              </Section>
            )}
          </GridContainer>

          <ComposicionesSection>
            <SectionTitle>
              Composición del Modelo,{" "}
              {cliente.modeloContratado.composiciones
                .reduce((total, comp) => total + comp.metrosCuadrados, 0)
                .toFixed(2)}{" "}
              m²
            </SectionTitle>
            <ComposicionesGrid>
              {cliente.modeloContratado.composiciones.map((comp, idx) => (
                <ComposicionCard key={idx}>
                  <ComposicionHeader>
                    <ComposicionTitle>{comp.articulo}</ComposicionTitle>
                    <ComposicionMetros>
                      {comp.metrosCuadrados.toFixed(2)}m²
                    </ComposicionMetros>
                  </ComposicionHeader>
                  <ComposicionMedidas>
                    {comp?.ancho?.toFixed(2)}m x {comp.largo?.toFixed(2)}m
                  </ComposicionMedidas>
                  {comp.observaciones && (
                    <ComposicionObs>{comp.observaciones}</ComposicionObs>
                  )}
                </ComposicionCard>
              ))}
            </ComposicionesGrid>
          </ComposicionesSection>

          {cliente.modeloContratado.observaciones && (
            <ObservacionesSection>
              <SectionTitle>Observaciones Generales</SectionTitle>
              <ObservacionesText>
                {cliente.modeloContratado.observaciones}
              </ObservacionesText>
            </ObservacionesSection>
          )}
        </ModeloCard>
      ) : (
        <EmptyState>
          <EmptyText>No hay modelo contratado</EmptyText>
        </EmptyState>
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
        <ImagenModal>
          <ImagenModalOverlay onClick={() => setShowImagenModal(false)} />
          <ImagenModalContent>
            <CloseButton onClick={() => setShowImagenModal(false)}>
              <X size={24} />
            </CloseButton>
            <ImagenModalImg
              src={cliente.modeloContratado.imagen}
              alt={cliente.modeloContratado.nombre}
            />
          </ImagenModalContent>
        </ImagenModal>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ModeloCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const Section = styled.div``;

const SectionTitle = styled.h3`
  font-weight: 500;
  color: #111827;
  margin-bottom: 1rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const InfoValue = styled.span`
  margin-left: 0.5rem;
  color: #111827;
`;

// InfoItem Component
const InfoItem = ({ label, value }) => (
  <InfoItemContainer>
    <InfoLabel>{label}:</InfoLabel>
    <InfoValue>{value}</InfoValue>
  </InfoItemContainer>
);

const ModeloHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModeloInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModeloTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-transform: capitalize;
`;

const ModeloImagen = styled.img`
  width: 100%;
  height: 500px;
  //   object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModeloPrecio = styled.div`
  text-align: right;
`;

const PrecioLabel = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const PrecioValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2563eb;
`;

const ComposicionesSection = styled.div`
  margin-top: 2rem;
`;

const ComposicionesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ComposicionCard = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const ComposicionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ComposicionTitle = styled.h4`
  font-weight: 500;
  color: #111827;
  text-transform: capitalize;
`;

const ComposicionMetros = styled.span`
  font-size: 0.875rem;
  color: #2563eb;
  font-weight: 500;
`;

const ComposicionMedidas = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ComposicionObs = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.5rem;
`;

const ObservacionesSection = styled.div``;

const ObservacionesText = styled.p`
  color: #4b5563;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`;

const EmptyText = styled.p`
  color: #6b7280;
`;

const ImagenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ImagenModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ImagenModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1001;
`;

const ImagenModalImg = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: white;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  svg {
    color: #111827;
  }
`;

export default ModelosContratados;
