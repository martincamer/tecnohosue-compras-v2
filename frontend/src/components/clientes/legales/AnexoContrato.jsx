import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import AnexoPDF from "./AnexoPDF";

const AnexoContrato = ({ cliente }) => {
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
    <AnexoContainer>
      <AnexoHeader>
        <h2>Anexo - Datos del Adquiriente</h2>
      </AnexoHeader>

      <AnexoContent>
        <FormularioContainer>
          <Seccion>
            <h3 className="text-xl font-bold mb-4">ADQUIRIENTE</h3>

            <Campo>
              <Label>Nombre y Apellido:</Label>
              <Value>
                {cliente?.fantasyName ||
                  "................................................"}
              </Value>
            </Campo>

            <GridDos>
              <Campo>
                <Label>Fecha de Nacimiento:</Label>
                <Value>{cliente?.birthDate || "....../....../......"}</Value>
              </Campo>
              <Campo>
                <Label>D.N.I.:</Label>
                <Value>
                  {cliente?.documentNumber || "........................."}
                </Value>
              </Campo>
            </GridDos>

            <GridTres>
              <Campo>
                <Label>Edad:</Label>
                <Value>{cliente?.age || ".........."}</Value>
              </Campo>
              <Campo>
                <Label>Estado Civil:</Label>
                <Value>
                  {cliente?.civilStatus || "........................"}
                </Value>
              </Campo>
              <Campo>
                <Label>Nacionalidad:</Label>
                <Value>
                  {cliente?.nationality || "........................"}
                </Value>
              </Campo>
            </GridTres>

            <GridDos>
              <Campo>
                <Label>Domicilio Particular:</Label>
                <Value>
                  {cliente?.address?.street || "........................."}
                </Value>
              </Campo>
              <Campo>
                <Label>Nº:</Label>
                <Value>{cliente?.address?.number || "........"}</Value>
              </Campo>
            </GridDos>

            <GridDos>
              <Campo>
                <Label>Teléfono:</Label>
                <Value>{cliente?.phone || "........................."}</Value>
              </Campo>
              <Campo>
                <Label>Localidad:</Label>
                <Value>
                  {cliente?.address?.city || "........................."}
                </Value>
              </Campo>
            </GridDos>

            <Campo>
              <Label>Trabajo en:</Label>
              <Value>
                {cliente?.workPlace ||
                  "................................................"}
              </Value>
            </Campo>

            <GridDos>
              <Campo>
                <Label>Remuneración Total:</Label>
                <Value>
                  {cliente?.salary
                    ? `$${cliente.salary}`
                    : "........................."}
                </Value>
              </Campo>
              <Campo>
                <Label>Percibo Neto:</Label>
                <Value>
                  {cliente?.netSalary
                    ? `$${cliente.netSalary}`
                    : "........................."}
                </Value>
              </Campo>
            </GridDos>
          </Seccion>
        </FormularioContainer>
      </AnexoContent>

      <AccionesContainer>
        <PDFDownloadLink
          document={<AnexoPDF cliente={cliente} />}
          fileName={`anexo-${cliente.fantasyName}-${cliente?.contractNumber}.pdf`}
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
                  Descargar PDF ANEXO
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </AccionesContainer>
    </AnexoContainer>
  );
};

const AnexoContainer = styled.div`
  padding: 2rem;
`;

const AnexoHeader = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const AnexoContent = styled.div`
  margin-bottom: 2rem;
`;

const FormularioContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Seccion = styled.div`
  margin-bottom: 2rem;
`;

const Campo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: 500;
  min-width: 150px;
`;

const Value = styled.span`
  flex: 1;
  border-bottom: 1px dotted #666;
  padding: 0.25rem 0;
`;

const GridDos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const GridTres = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AccionesContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media print {
    display: none;
  }
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

export default AnexoContrato;
