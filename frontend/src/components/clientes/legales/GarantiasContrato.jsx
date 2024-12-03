import React, { useState, useContext } from "react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import GarantiasPDF from "./GarantiasPDF";

const GarantiasContrato = ({ cliente }) => {
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
    <GarantiasContainer>
      <GarantiasHeader>
        <h2>Constitución de Garantías</h2>
      </GarantiasHeader>
      <GarantiasContent>
        <Parrafo>
          Conforme a la Cláusula Décimo Primera del contrato Nº{" "}
          <span className="font-bold">{cliente?.contractNumber}</span> Sr./Sra.{" "}
          <span className="font-bold uppercase">{cliente?.fantasyName}</span>{" "}
          titular del Documento Nacional de Identidad{" "}
          <span className="font-bold">{cliente?.documentNumber}</span> con
          domicilio real en{" "}
          <span className="font-bold uppercase">
            {cliente?.address?.street}
          </span>{" "}
          de la ciudad de{" "}
          <span className="font-bold uppercase">{cliente?.address?.city}</span>,
          provincia de{" "}
          <span className="font-bold uppercase">{cliente?.address?.state}</span>
          .
        </Parrafo>
      </GarantiasContent>

      <AccionesContainer>
        <PDFDownloadLink
          document={<GarantiasPDF cliente={cliente} />}
          fileName={`garantias-${cliente.fantasyName}-${cliente?.contractNumber}.pdf`}
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
                  Descargar PDF GARANTÍAS
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </AccionesContainer>
    </GarantiasContainer>
  );
};

const GarantiasContainer = styled.div`
  padding: 2rem;
`;

const GarantiasHeader = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const GarantiasContent = styled.div`
  margin-bottom: 2rem;
`;

const Parrafo = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
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

export default GarantiasContrato;
