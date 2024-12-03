import React, { useState } from "react";
import styled from "styled-components";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { FileDown, Loader } from "lucide-react";
import AdquirientePDF from "./AdquirientePDF";

const Adquiriente = ({ cliente }) => {
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
    <AdquirienteContainer>
      <AdquirienteHeader>
        <h2>ADQUIRIENTE</h2>
      </AdquirienteHeader>

      <FormularioContainer>
        <Campo>
          <Label>Nombre y Apellido:</Label>
          <Valor>
            {cliente?.fantasyName ||
              ".........................................................."}
          </Valor>
        </Campo>

        <GridDos>
          <Campo>
            <Label>Fecha de Nacimiento:</Label>
            <Valor>
              {cliente?.birthDate || "........./........./........."}
            </Valor>
          </Campo>
          <Campo>
            <Label>D.N.I.:</Label>
            <Valor>
              {cliente?.documentNumber || "................................."}
            </Valor>
          </Campo>
        </GridDos>

        <GridTres>
          <Campo>
            <Label>Edad:</Label>
            <Valor>{cliente?.age || "............"}</Valor>
          </Campo>
          <Campo>
            <Label>Estado Civil:</Label>
            <Valor>
              {cliente?.civilStatus || "..........................."}
            </Valor>
          </Campo>
          <Campo>
            <Label>Exp.por:</Label>
            <Valor>{"..........................."}</Valor>
          </Campo>
          <Campo>
            <Label>Nación:</Label>
            <Valor>
              {cliente?.nationality || "..........................."}
            </Valor>
          </Campo>
        </GridTres>

        <GridDos>
          <Campo>
            <Label>Domicilio Particular:</Label>
            <Valor>
              {cliente?.address?.street || "................................."}
            </Valor>
          </Campo>
          <Campo>
            <Label>Nº:</Label>
            <Valor>{cliente?.address?.number || "............"}</Valor>
          </Campo>
        </GridDos>

        <Campo>
          <Label>Entre Calles:</Label>
          <Valor>
            {
              "................................................................................................"
            }
          </Valor>
        </Campo>

        <GridTres>
          <Campo>
            <Label>De:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
          <Campo>
            <Label>Piso:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
          <Campo>
            <Label>Dpto:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
        </GridTres>

        <GridDos>
          <Campo>
            <Label>Tel.:</Label>
            <Valor>
              {cliente?.phone || "................................."}
            </Valor>
          </Campo>
          <Campo>
            <Label>Alquiler $:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>Loc.:</Label>
            <Valor>
              {cliente?.address?.city || "................................."}
            </Valor>
          </Campo>
        </GridDos>

        <Campo>
          <Label>Trabajo en:</Label>
          <Valor>
            {cliente?.workPlace ||
              "................................................................................................"}
          </Valor>
        </Campo>

        <Campo>
          <Label>Calle:</Label>
          <Valor>
            {
              "................................................................................................"
            }
          </Valor>
        </Campo>

        <GridDos>
          <Campo>
            <Label>Tel.:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>Loc.:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>Desde el:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
        </GridDos>

        <Campo>
          <Label>Puesto que ocupa:</Label>
          <Valor>
            {
              "................................................................................................"
            }
          </Valor>
        </Campo>

        <GridTres>
          <Campo>
            <Label>Div.:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
          <Campo>
            <Label>Sec.:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
          <Campo>
            <Label>Dpto:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
          <Campo>
            <Label>Nº Legajo:</Label>
            <Valor>{"....................."}</Valor>
          </Campo>
        </GridTres>

        <GridDos>
          <Campo>
            <Label>Remuneración Total:</Label>
            <Valor>
              {cliente?.salary
                ? `$${cliente.salary}`
                : "................................."}
            </Valor>
          </Campo>
          <Campo>
            <Label>Percibo Neto:</Label>
            <Valor>
              {cliente?.netSalary
                ? `$${cliente.netSalary}`
                : "................................."}
            </Valor>
          </Campo>
        </GridDos>

        <Campo>
          <Label>Caja a la que aporta:</Label>
          <Valor>
            {
              "................................................................................................"
            }
          </Valor>
        </Campo>

        <GridDos>
          <Campo>
            <Label>Otros ingresos:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>¿Son Permanentes?:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
        </GridDos>

        <Campo>
          <Label>Cargas familiares:</Label>
          <Valor>
            {
              "................................................................................................"
            }
          </Valor>
        </Campo>

        <Campo>
          <Label>¿Contribuye otra persona al mantenimiento del hogar?:</Label>
          <Valor>
            {
              "................................................................................................"
            }
          </Valor>
        </Campo>

        <GridDos>
          <Campo>
            <Label>Lugar de Trabajo:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>¿Cuanto aporta?:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
        </GridDos>

        <GridDos>
          <Campo>
            <Label>¿Comerciante o profesional?:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>¿Existe contrato social?:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
        </GridDos>

        <GridDos>
          <Campo>
            <Label>Intervino:</Label>
            <Valor>{"................................."}</Valor>
          </Campo>
          <Campo>
            <Label>Fecha:</Label>
            <Valor>{"........./........./........."}</Valor>
          </Campo>
        </GridDos>

        <FirmaContainer>
          <Firma>
            <Line />
            <Text>FIRMA</Text>
          </Firma>
          <Firma>
            <Line />
            <Text>ACLARACIÓN</Text>
          </Firma>
        </FirmaContainer>
      </FormularioContainer>

      <AccionesContainer>
        <PDFDownloadLink
          document={<AdquirientePDF cliente={cliente} />}
          fileName={`adquiriente-${cliente.fantasyName}-${cliente?.contractNumber}.pdf`}
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
                  Descargar PDF ADQUIRIENTE
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </AccionesContainer>
      {/* <AccionesContainer>
        <PDFViewer>
          <AdquirientePDF cliente={cliente} />
        </PDFViewer>
      </AccionesContainer> */}
    </AdquirienteContainer>
  );
};

// Estilos
const AdquirienteContainer = styled.div`
  padding: 2rem;
`;

const AdquirienteHeader = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
`;

const FormularioContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Campo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: 500;
  min-width: 180px;
`;

const Valor = styled.span`
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FirmaContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

const Firma = styled.div`
  text-align: center;
  width: 200px;
`;

const Line = styled.div`
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-weight: 500;
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

export default Adquiriente;
