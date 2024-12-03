import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import GarantiasAnexoPDF from "./GarantiasAnexoPDF";

const GarantiasAnexo = ({ cliente }) => {
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
        <Title>ANEXO V - GARANTÍAS</Title>
      </Header>

      <Content>
        <Section>
          <Paragraph>
            El presente anexo fija el marco dentro del cual serán aceptadas las
            garantías del contrato en calidad y cantidad.
          </Paragraph>

          <Paragraph>
            Contado diferido y hasta diez cuotas: El adquiriente deberá contar
            con: Dos garantías reales, o, Una garantía real y otra garantía
            personal.
          </Paragraph>

          <Paragraph>
            Anticipo y más de diez cuotas: El adquiriente deberá contar con: Dos
            garantías reales y una garantía personal, o, Una garantía real y dos
            garantías personales
          </Paragraph>
        </Section>

        <Separator />

        <Section>
          <Paragraph>
            Se entiende por garantía real: que el garante debe contar con un
            título de propiedad inmobiliaria a su nombre libre de embargos e
            hipotecas, no afectado a bien de familia.
          </Paragraph>

          <Paragraph>
            No son garantías reales aceptadas por SISTEMA DE VIVIENDAS
            TECNOHOGAR SRL, los boletos de compraventa, salvo que estuvieren
            inscriptos ante el Registro de Propiedad respectivo y los bienes que
            estuvieren en trámite sucesorio.
          </Paragraph>

          <Paragraph>
            En ningún caso se aceptarán como garantes los titulares de bienes
            inmuebles que se encontraren inhibidos, en quiebra, concurso
            preventivo de acreedores o en cualquier otro procedimiento que
            pusiera en peligro los bienes que se ofrezcan como garantía de
            cumplimiento del contrato.
          </Paragraph>

          <Paragraph>
            Se entiende por garantía personal: que el garante debe contar con
            recibo de sueldo suficiente como para poder afrontar la
            responsabilidad que genera el monto del contrato. La antigüedad en
            el puesto de trabajo será esencial para la consideración de la
            validez de la fianza.
          </Paragraph>

          <Paragraph>
            No son garantías personales aceptadas por SISTEMA DE VIVIENDAS
            TECNOHOGAR SRL, los haberes jubilatorios, la condición de
            monotributista, sueldos o retribuciones que por su caracter sean
            inembargables.
          </Paragraph>

          <Paragraph>
            Sistema de Viviendas Tecnohogar se reserva al derecho de rechazar
            las garantías que presentadas, a su solo criterio, no tuvieran las
            condiciones pretendidas.
          </Paragraph>
        </Section>

        <FirmaContainer>
          <Label>Firma conforme:</Label>
          <Line />
        </FirmaContainer>
      </Content>

      <AccionesContainer>
        <PDFDownloadLink
          document={<GarantiasAnexoPDF cliente={cliente} />}
          fileName={`garantias-anexo-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
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
                  Descargar PDF GARANTÍAS ANEXO
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

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  text-align: justify;
`;

const Separator = styled.div`
  border-top: 1px solid #000;
  margin: 2rem 0;
`;

const FirmaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const Label = styled.span`
  font-weight: 500;
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

export default GarantiasAnexo;
