import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import AnexoDosPDF from "./AnexoDosPDF";

const AnexoDos = ({ cliente }) => {
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
        <Title>ANEXO II</Title>
      </Header>

      <Content>
        <DottedLinesContainer>
          {[...Array(20)].map((_, index) => (
            <DottedLine key={index} />
          ))}
        </DottedLinesContainer>

        <TotalSection>
          <TotalTitle>TOTAL ADICIONAL CONTADO / EFECTIVO</TotalTitle>
          {[...Array(6)].map((_, index) => (
            <DottedLine key={`total-${index}`} />
          ))}
        </TotalSection>

        <FirmasContainer>
          <FirmaBox>
            <Line />
            <FirmaText>FIRMA CLIENTE</FirmaText>
          </FirmaBox>
          <FirmaBox>
            <Line />
            <FirmaText>FIRMA JEFE DE FABRICA</FirmaText>
          </FirmaBox>
        </FirmasContainer>
      </Content>

      <AccionesContainer>
        <PDFDownloadLink
          document={<AnexoDosPDF cliente={cliente} />}
          fileName={`anexo-2-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
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
                  Descargar PDF ANEXO II
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DottedLinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DottedLine = styled.div`
  border-bottom: 1px dotted #666;
  height: 1.5rem;
`;

const TotalSection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TotalTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FirmasContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  padding: 0 2rem;
`;

const FirmaBox = styled.div`
  width: 200px;
  text-align: center;
`;

const Line = styled.div`
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
`;

const FirmaText = styled.p`
  font-size: 0.9rem;
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

export default AnexoDos;
