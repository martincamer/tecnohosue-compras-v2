import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import CaracteristicasTecnicasPDF from "./CaracteristicasTecnicasPDF";

const CaracteristicasTecnicas = ({ cliente }) => {
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
        <h2>CARACTERÍSTICAS TÉCNICAS</h2>
        <h3>ANEXO I</h3>
      </Header>

      <Content>
        {/* Aquí puedes agregar una vista previa del contenido si lo deseas */}
      </Content>

      <AccionesContainer>
        <PDFDownloadLink
          document={<CaracteristicasTecnicasPDF />}
          fileName={`caracteristicas-tecnicas-${cliente?.fantasyName}-${cliente?.contractNumber}.pdf`}
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
                  Descargar PDF CARACTERÍSTICAS TÉCNICAS
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </AccionesContainer>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const Content = styled.div`
  margin-bottom: 2rem;
`;

const AccionesContainer = styled.div`
  display: flex;
  gap: 1rem;
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

export default CaracteristicasTecnicas;
