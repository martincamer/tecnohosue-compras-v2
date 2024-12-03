import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import RequisitosPDF from "./RequisitosPDF";

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
  gap: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const Important = styled.p`
  font-weight: bold;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 4px;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5;
  &:before {
    content: "•";
    color: #2563eb;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const FirmaContainer = styled.div`
  margin: 2rem auto;
  width: 300px;
  text-align: center;
`;

const Line = styled.div`
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
`;

const FirmaText = styled.p`
  font-size: 0.9rem;
`;

const SmallText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
`;

const Warning = styled.p`
  font-style: italic;
  color: #dc2626;
  margin: 1.5rem 0;
  text-align: center;
`;

const Footer = styled.p`
  text-align: center;
  font-style: italic;
  margin-top: 2rem;
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

const Requisitos = ({ cliente }) => {
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
        <Title>REQUISITOS DE DOCUMENTACIÓN</Title>
      </Header>

      <Content>
        <Section>
          <SectionTitle>ADQUIRIENTE:</SectionTitle>
          <Text>
            COMPLETA TITULAR DEL CONTRATO, ADJUNTANDO FOTOCOPIA DEL DNI (1º Y 2º
            HOJA). FIRMA AL PIE.
          </Text>
        </Section>

        <Section>
          <SectionTitle>CO-DEUDOR:</SectionTitle>
          <Text>
            COMPLETAN LOS TRES (3) GARANTES, ADJUNTANDO CADA UNO DE ELLOS,
            FOTOCOPIA DEL DNI (1º Y 2º HOJA) Y ULTIMO RECIBO DE SUELDO. FIRMA AL
            PIE.
          </Text>
          <Text>
            (EN CASO QUE UNO DE LOS GARANTES, PRESENTE ESCRITURA PROPIETARIA; LA
            MISMA NO PUEDE SER BIEN DE FAMILIA).
          </Text>
        </Section>

        <Important>
          NO SE ACEPTAN: ESCRITURAS EN JUICIO SUCESORIO. BOLETO DE COMPRA VENTA.
          MONOTRIBUTOS. HABERES JUBILATORIOS.
        </Important>

        <Section>
          <SectionTitle>PAGARÉ:</SectionTitle>
          <Text>LO FIRMAN EL TITULAR Y LOS GARANTES.</Text>
          <List>
            <ListItem>
              LIBRADOR: ES EL TITULAR DEL CONTRATO. COMPLETA LOS DATOS
              SOLICITADOS. FIRMA Y ACLARA A LA DERECHA.
            </ListItem>
            <ListItem>
              POR AVAL: PRIMER GARANTE. COMPLETA LOS DATOS SOLICITADOS. FIRMA Y
              ACLARA A LA DERECHA.
            </ListItem>
            <ListItem>
              POR AVAL: SEGUNDO GARANTE. COMPLETA LOS DATOS SOLICITADOS. FIRMA Y
              ACLARA A LA DERECHA.
            </ListItem>
            <ListItem>
              POR AVAL: TERCER GARANTE. COMPLETA LOS DATOS SOLICITADOS. FIRMA Y
              ACLARA A LA DERECHA.
            </ListItem>
          </List>
        </Section>

        <Important>
          LAS FIRMAS DEBEN ESTAR CERTIFICADAS ANTE UN ESCRIBANO. NO SE COMPLETAN
          FECHAS.
        </Important>

        <FirmaContainer>
          <Line />
          <FirmaText>Firma y aclaración del titular del contrato</FirmaText>
          <SmallText>(Devolver firmado junto a la documentación)</SmallText>
        </FirmaContainer>

        <Warning>
          Si las garantías solicitas se encuentran incompletas, el contrato no
          pasará a fábrica. No nos comprometa.
        </Warning>

        <Footer>Administración Viviendas Tecnohouse.</Footer>
      </Content>

      <AccionesContainer>
        <PDFDownloadLink
          document={<RequisitosPDF cliente={cliente} />}
          fileName={`requisitos-${cliente?.fantasyName}-${cliente?.documentNumber}.pdf`}
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
                  Descargar PDF REQUISITOS
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </AccionesContainer>
    </Container>
  );
};

export default Requisitos;
