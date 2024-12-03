import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import AutorizacionFotoPDF from "./AutorizacionFotoPDF";

const AutorizacionFoto = ({ cliente }) => {
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
        <Title>AUTORIZACIÓN DE FOTOGRAFÍA</Title>
      </Header>

      <Content>
        <Saludo>
          <Text>Señores</Text>
          <Text>De mi consideración</Text>
        </Saludo>

        <Parrafo>
          Por la presente autorizo a VIVIENDAS TECNOHOUSE DE SISTEMAS DE
          VIVIENDAS TECNOHOGAR S.R.L., a publicitar sus servicios utilizando
          fotografia, gigantografía, impresa o digital o cualquier medio gráfico
          sin limitación y / o en publicidad vía Televisión, Página Web, redes
          sociales y / o cualquier otro, de la vivienda que fue armada y
          entregada a mi parte.
        </Parrafo>

        <Parrafo>
          Dicha autorización se concede bajo la condición de preservar los datos
          personales y familiares del firmante y se concede en forma
          absolutamente gratuita e incondicional.
        </Parrafo>

        <Text>Atentamente,</Text>

        <FirmasContainer>
          <FirmaRow>
            <Label>FIRMA:</Label>
            <Line />
          </FirmaRow>
          <FirmaRow>
            <Label>ACLARACION:</Label>
            <Line />
          </FirmaRow>
          <FirmaRow>
            <Label>D.N.I.:</Label>
            <Line />
          </FirmaRow>
          <FirmaRow>
            <Label>DOMICILIO COMPLETO DE LA VIVIENDA:</Label>
            <Line />
          </FirmaRow>
        </FirmasContainer>
      </Content>

      <AccionesContainer>
        <PDFDownloadLink
          document={<AutorizacionFotoPDF cliente={cliente} />}
          fileName={`autorizacion-foto-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
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
                  Descargar PDF AUTORIZACIÓN
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
  max-width: 800px;
  margin: 0 auto;
`;

const Saludo = styled.div`
  margin-bottom: 2rem;
`;

const Text = styled.p`
  margin-bottom: 0.5rem;
`;

const Parrafo = styled.p`
  text-align: justify;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FirmasContainer = styled.div`
  margin-top: 3rem;
`;

const FirmaRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const Label = styled.span`
  font-weight: 500;
  min-width: 120px;
`;

const Line = styled.div`
  flex: 1;
  border-bottom: 1px solid #000;
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

export default AutorizacionFoto;
