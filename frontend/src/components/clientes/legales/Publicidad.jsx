import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import PublicidadPDF from "./PublicidadPDF";

const Publicidad = ({ cliente }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async (blob) => {
    setIsGenerating(true);
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      return blob;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>SU OPINIÓN NOS INTERESA</Title>
        <Subtitle>¿Cómo nos conoció?</Subtitle>
        <Instruction>
          Por favor marque y/o complete lo que corresponda.
        </Instruction>
      </Header>

      <Content>
        <OptionsContainer>
          <Option>
            <Checkbox type="checkbox" />
            <Label>Publicidad Televisa (Programación / Canal):</Label>
            <Input type="text" />
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Publicidad Gráfica (Diario / Periódico / Revista):</Label>
            <Input type="text" />
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Publicidad Radial (Radio / Programa):</Label>
            <Input type="text" />
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Página Web</Label>
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Publicidad en Facebook</Label>
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Publicidad en Twitter</Label>
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Buscadores WEB (Google/Bing/Yahoo,etc.)</Label>
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>
              Promociones en Ferias, Eventos, etc. (por favor especificar el
              lugar)
            </Label>
            <Input type="text" />
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Me lo recomendó un conocido</Label>
            <Input type="text" />
          </Option>

          <Option>
            <Checkbox type="checkbox" />
            <Label>Otro</Label>
            <Input type="text" />
          </Option>
        </OptionsContainer>

        <FirmasContainer>
          <FirmaRow>
            <Label>FIRMA:</Label>
            <Line />
          </FirmaRow>
          <FirmaRow>
            <Label>ACLARACIÓN:</Label>
            <Line />
          </FirmaRow>
          <FirmaRow>
            <Label>E-MAIL:</Label>
            <Line />
          </FirmaRow>
        </FirmasContainer>

        <Thanks>¡Gracias por elegirnos!</Thanks>
      </Content>

      <AccionesContainer>
        <PDFDownloadLink
          document={<PublicidadPDF cliente={cliente} />}
          fileName={`publicidad-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
        >
          {({ blob, loading }) => (
            <Button
              type="button"
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
                  Descargar PDF PUBLICIDAD
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
  margin-bottom: 0.5rem;
`;

const Instruction = styled.p`
  font-style: italic;
  color: #666;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Label = styled.label`
  flex: 1;
  min-width: 200px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px;
    ring-color: #93c5fd;
  }
`;

const FirmasContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FirmaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Line = styled.div`
  flex: 1;
  border-bottom: 1px solid #000;
`;

const Thanks = styled.p`
  text-align: center;
  font-style: italic;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #2563eb;
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

export default Publicidad;
