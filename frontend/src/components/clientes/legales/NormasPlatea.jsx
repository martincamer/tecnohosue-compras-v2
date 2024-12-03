import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import NormasPDF from "./NormasPDF";

const NormasPlatea = ({ cliente }) => {
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
        <Title>NORMAS PARA LA CONSTRUCCION DE PLATEA</Title>
        <Subtitle>ANEXO IV</Subtitle>
      </Header>

      <FormularioContainer>
        <DatosSection>
          <Campo>
            <Label>Fecha:</Label>
            <Valor>{new Date().toLocaleDateString()}</Valor>
          </Campo>
          <Campo>
            <Label>Nombre y Apellido:</Label>
            <Valor>
              {cliente?.fantasyName ||
                "...................................................................."}
            </Valor>
          </Campo>
          <GridDos>
            <Campo>
              <Label>Dirección:</Label>
              <Valor>
                {cliente?.address?.street ||
                  "...................................."}
              </Valor>
            </Campo>
            <Campo>
              <Label>Tel.:</Label>
              <Valor>
                {cliente?.phone || "...................................."}
              </Valor>
            </Campo>
          </GridDos>
        </DatosSection>

        <Section>
          <SectionTitle>1. PLATEA</SectionTitle>
          <SectionContent>
            Deberá realizarse a un nivel superior al de la vereda, con una
            medida de un metro más largo y un metro más ancho que el modelo de
            la vivienda adquirida. Su espesor deberá ser de 0.15 a 0.25 mts. de
            alto como mínimo y deberá encontrarse en PERFECTA ESCUADRA Y NIVEL.
            Sin cañerias ni desagües.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>2. LA PROPORCION</SectionTitle>
          <SectionContent>
            Partes: nueve (9) partes de granza fina, dos (2) de plasticor, una
            (1) parte de arena y media parte (1/2) de cemento portland.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>3. ACCESO</SectionTitle>
          <SectionContent>
            El acceso al lote deberá estar libre de malezas y otros objetos que
            obstaculizen el libre tránsito de mercadería, material y personal de
            ensamble.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>4. INCUMPLIMIENTO</SectionTitle>
          <SectionContent>
            El incumplimiento de dichas normas, y la sola constatación por
            personal de VIVIENDAS TECNOHOUSE DE SISTEMA DE VIVIENDAS TECNOHOGAR
            S.R.L. hace posible el retorno a fábrica de todos los materiales
            debiendo efectuarse en ese mismo instante un nuevo acuerdo de
            entrega responsabilizándose el COMITENTE por la integridad de dichos
            materiales, abonando nuevamente los gastos que todo ellos genere.
          </SectionContent>
        </Section>

        <Footer>
          En prueba de conformidad se firman dos ejemplares de un mismo tenor y
          a un solo efecto en la ciudad de
          .................................................. a los
          ............... días de .............................. de
          20...........
        </Footer>

        <FirmaContainer>
          <Firma>
            <Line />
            <Text>FIRMA</Text>
          </Firma>
          <Firma>
            <Line />
            <Text>ACLARACIÓN</Text>
          </Firma>
          <Firma>
            <Line />
            <Text>DNI</Text>
          </Firma>
        </FirmaContainer>
      </FormularioContainer>

      <AccionesContainer>
        <PDFDownloadLink
          document={<NormasPDF cliente={cliente} />}
          fileName={`normas-platea-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
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
                  Descargar PDF NORMAS PLATEA
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

const DatosSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
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

const GridDos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.p`
  text-align: justify;
  padding-left: 1rem;
`;

const Footer = styled.p`
  text-align: justify;
  margin: 2rem 0;
`;

const FirmaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const Firma = styled.div`
  text-align: center;
`;

const Line = styled.div`
  border-top: 1px solid black;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
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

export default NormasPlatea;
