import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import BasePlateaPDF from "./BasePlateaPDF";

const BasePlatea = ({ cliente }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async (blob) => {
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return blob;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>BASE DE PLATEA</Title>
        <Subtitle>ANEXO IV</Subtitle>
      </Header>

      <FormularioContainer>
        <GridDos>
          <Campo>
            <Label>MODELO:</Label>
            <Valor>
              {cliente?.model || "................................."}
            </Valor>
          </Campo>
          <Campo>
            <Label>Ancho:</Label>
            <Valor>
              {cliente?.width || "................................."}
            </Valor>
          </Campo>
        </GridDos>

        <GridDos>
          <Campo>
            <Label>Largo:</Label>
            <Valor>
              {cliente?.length || "................................."}
            </Valor>
          </Campo>
          <Campo>
            <Label>Sup. Cubierta:</Label>
            <Valor>
              {cliente?.coveredArea || "................................."}
            </Valor>
          </Campo>
        </GridDos>

        <SituacionContainer>
          <Label>Situación del lote/lugar donde se encuentra la platea:</Label>
          <CheckboxGrid>
            <CheckboxItem>
              <Checkbox type="checkbox" />
              <span>a) Lote Interno</span>
            </CheckboxItem>
            <CheckboxItem>
              <Checkbox type="checkbox" />
              <span>b) Lote Externo</span>
            </CheckboxItem>
            <CheckboxItem>
              <Checkbox type="checkbox" />
              <span>c) Medianera</span>
            </CheckboxItem>
            <CheckboxItem>
              <Checkbox type="checkbox" />
              <span>d) Terraza</span>
            </CheckboxItem>
            <CheckboxItem>
              <Checkbox type="checkbox" />
              <span>e) Lote Propio</span>
            </CheckboxItem>
            <CheckboxItem>
              <Checkbox type="checkbox" />
              <span>f) Lote de Tercero</span>
            </CheckboxItem>
          </CheckboxGrid>
        </SituacionContainer>

        <PlateaVisual>
          <PlateaBox>
            <PlateaGrid />
            <MedidaAncho>ANCHO: {cliente?.width || "X.XX"} m</MedidaAncho>
            <MedidaLargo>LARGO: {cliente?.length || "X.XX"} m</MedidaLargo>
            <NorteIndicator>↑N</NorteIndicator>
            <NivelIndicator>Nivel: 0.15m - 0.25m</NivelIndicator>
          </PlateaBox>
        </PlateaVisual>
      </FormularioContainer>

      <AccionesContainer>
        <PDFDownloadLink
          document={<BasePlateaPDF cliente={cliente} />}
          fileName={`base-platea-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
        >
          {({ blob, loading }) => (
            <Button
              disabled={loading || isGenerating}
              onClick={() => blob && handleDownload(blob)}
            >
              {loading || isGenerating ? (
                <>
                  <Loader size={18} className="animate-spin mr-2" />
                  Generando PDF...
                </>
              ) : (
                <>
                  <FileDown size={18} className="mr-2" />
                  Descargar PDF BASE PLATEA
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </AccionesContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
`;

const FormularioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GridDos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Campo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  min-width: 120px;
`;

const Valor = styled.span`
  flex: 1;
  border-bottom: 1px solid #ccc;
  padding-bottom: 2px;
`;

const SituacionContainer = styled.div`
  margin-top: 1rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-left: 1rem;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

const PlateaVisual = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const PlateaBox = styled.div`
  width: 600px;
  height: 400px;
  border: 2px solid #333;
  position: relative;
  background: white;
`;

const PlateaGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(#ccc 1px, transparent 1px),
    linear-gradient(90deg, #ccc 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.2;
`;

const MedidaAncho = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
`;

const MedidaLargo = styled.div`
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translateX(-50%) rotate(-90deg);
  font-size: 0.8rem;
`;

const NorteIndicator = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1rem;
`;

const NivelIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.8rem;
`;

const AccionesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

export default BasePlatea;
