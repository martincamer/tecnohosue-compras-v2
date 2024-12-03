import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Printer, FileDown, Loader, Eye } from "lucide-react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ContratoPDF from "./ContratoPDF";
import { useClientes } from "../../../context/ClientesContext";
import ModalPDF from "../../Modal/ModalPDF";
import { useAuth } from "../../../context/AuthContext";

// Función auxiliar para convertir números a letras (puedes implementarla o usar una librería)
const numeroALetras = (numero) => {
  // Implementación básica - reemplazar con una librería más robusta si es necesario
  return numero.toString();
};

// Array de meses
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const ContratoVivienda = ({ cliente, modeloContratado }) => {
  const { auth } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const { updateContractStatus } = useClientes();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async (blob) => {
    setIsGenerating(true);

    try {
      // Simular tiempo de carga de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Actualizar el estado del contrato usando el contexto
      await updateContractStatus(cliente._id);

      return blob;
    } finally {
      setIsGenerating(false);
    }
  };

  if (!modeloContratado) {
    return (
      <EmptyState>
        No hay un modelo contratado para generar el contrato
      </EmptyState>
    );
  }

  const generarPDF = () => {
    // Implementar la generación del PDF
    console.log("Generando PDF...");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ContratoContainer>
      <ContratoHeader>
        <h2>Tecno Operaciones.</h2>
      </ContratoHeader>
      <div className="font-bold text-2xl mb-5 capitalize">
        Contrato {cliente.fantasyName} {cliente?.contractNumber}
      </div>
      <ContratoContent>
        <Parrafo>
          Entre{" "}
          <span className="font-bold">
            Viviendas Tecno Operaciones S.R.L. 30-71083448-9
          </span>
          , con domicilio en calle Iraola 925 de la ciudad de{" "}
          <span className="font-bold">Venado Tuerto</span>, provincia de{" "}
          <span className="font-bold">Santa Fe</span>, por una parte y en
          adelante llamada LA CONTRATISTA y el/la Sr./Sra.{" "}
          <span className="font-bold uppercase">{cliente.fantasyName}</span>,
          titular del Documento de Identidad{" "}
          <span className="font-bold">{cliente?.documentNumber}</span> con
          domicilio real en{" "}
          <span className="font-bold uppercase">
            {cliente?.address?.street}
          </span>{" "}
          de la ciudad de{" "}
          <span className="font-bold uppercase">{cliente?.address?.city}</span>,
          provincia de{" "}
          <span className="font-bold uppercase">{cliente?.address?.state}</span>{" "}
          por otra parte y, en adelante llamada EL COMITENTE, se conviene la
          celebración del presente contrato, el que se regirá por lo dispuesto
          por las cláusulas y supletoriamente por lo dispuesto en el Código
          Civil en lo que fuera pertinente. supletoriamente por lo dispuesto en
          el Código Civil en lo que fuera pertinente.
        </Parrafo>
        <Clausula>
          <h3>PRIMERA:</h3>
          <p>EL COMITENTE solicita a LA CONTRATISTA:</p>
          <ol type="A">
            <li>
              La fabricación de elementos constitutivos de una vivienda{" "}
              <span className="font-bold uppercase">
                {modeloContratado?.nombre}
              </span>{" "}
              de{" "}
              <span className="font-bold uppercase">
                {modeloContratado?.totalMetrosCuadrados}
              </span>{" "}
              m² de superficie cubierta, medidas interiores en metros y conforme
              las condiciones técnicas que se señalan en el ANEXO I, que forma
              parte integrante del presente contrato.
            </li>
            <li>El armado de la vivienda a que se refiere el punto A.</li>
          </ol>
          <p>
            El presente contrato no involucra una vivienda llave en mano,
            encontrándose sujeto a las condiciones particulares de cada caso.
          </p>
          <p>
            <span className="font-bold">LA CONTRATISTA</span> se obliga al
            cumplimiento del objeto solicitado, fijando ambas partes que la
            fabricación de los elementos constitutivos y el armado de la
            vivienda, constituyen un solo objeto contractual único e
            inescindible. La descripción de los elementos constitutivos se
            señalan en el ANEXO III del presente contrato, formando parte del
            mismo.
          </p>
          <p className="underline">
            El armado de la vivienda no incluye la base o platea sobre la que se
            plantará la misma, siendo la ejecución de la misma por cuenta y
            costo de EL COMITENTE.
          </p>
          <p>
            En tal sentido EL COMITENTE se obliga a la realización de la base,
            con materiales adecuados y suficientes, que permitan el armado de la
            vivienda sobre la mencionada platea, todo ello conforme al ANEXO IV
            del presente contrato, siendo los datos y demás condiciones del
            terreno responsabilidad exclusiva de EL COMITENTE y no sujetos a
            verificación por parte de LA CONTRATISTA.
          </p>
          <p>
            Asimismo queda bajo responsabilidad de EL COMITENTE la realización
            de la carpeta interior de la vivienda que permite la fijación de las
            paredes impidiendo que las mismas sufran roturas o desplazamientos y
            ello, en un plazo de 24 horas a partir de la fecha de armado de los
            elementos constitutivos, objeto de este contrato.
          </p>
          <p>
            Será obligación de EL COMITENTE, el mantenimiento de todos los
            elementos constitutivos de la vivienda luego de su armado y entrega,
            así como las condiciones sus sellados, para evitar los efectos que
            pudieran afectarlos incluyendo sin limitar humedades, resecamiento,
            agrietamiento y deformación de las maderas, así como eventuales
            plagas.
          </p>
        </Clausula>
        <Clausula>
          <h3>SEGUNDA:</h3>
          <p>
            Sin perjuicio de lo establecido en la cláusula PRIMERA, EL COMITENTE
            solicita a LA CONTRATISTA, la modificación del modelo señalado
            conforme lo siguiente:
          </p>
          <ComposicionesContainer>
            {modeloContratado?.composiciones?.map((comp, index) => (
              <ComposicionItem key={index}>
                1- <span className="capitalize">{comp.articulo}</span>{" "}
                -------------------------- {comp.ancho}m x {comp.largo}m
                {comp.observaciones && ` - ${comp.observaciones}`}
              </ComposicionItem>
            ))}
          </ComposicionesContainer>
          <p>
            Siendo la misma acorde a sus necesidades habitacionales.LA
            CONTRATISTA acepta las modificaciones en la medida que no obliguen
            al cambio de las condiciones técnicas del ANEXO I antes mencionado y
            adjunto. EL COMITENTE se obliga a mantener la descripción y
            constitución del objeto contratado y mantener la misma al momento
            del armado de la vivienda.
          </p>
        </Clausula>
        <Clausula>
          <h3>TERCERA:</h3>
          <p>
            Siendo que LA CONTRATISTA se hace cargo del armado de la vivienda,
            en lote o terreno de propiedad de EL COMITENTE o sobre el cual la
            misma tuviere derecho, el mismo deberá indicar ubicación geográfica
            y acreditar vinculación con el lugar de posterior armado de la
            vivienda y medidas del mismo. Estas últimas se agregan en el ANEXO
            IV, siendo su precisión y justeza de responsabilidad de EL
            COMITENTE.
          </p>
          <p>
            LA CONTRATISTA puede rehusarse a armar la vivienda en el lote
            señalado por el COMITENTE cuando:
          </p>
          <ListaOrdenada>
            <li>
              No se acreditare relación alguna del lote con el signatario del
              contrato.
            </li>
            <li>
              Cuando no se hubiere construido la platea o base de apoyo de la
              que se señala en el anexo IV cláusula CUARTA del presente, o la
              misma estuviere ejecutada fuera de las normas de buenas prácticas
              de construcción, y/o dicha platea se encontrare fuera de la
              indicación física y/o material que señala el respectivo anexo.
            </li>
            <li>
              No se encontraren los pagos acordados en el contrato efectivizado
              al momento del armado, y sin perjuicio de lo dispuesto por la
              cláusula SEXTA del presente contrato.
            </li>
          </ListaOrdenada>
          <p>
            Cualquiera de estas conductas de EL COMITENTE provocan el nacimiento
            de daños y perjuicios a favor de LA CONTRATISTA, en tanto efectiva
            incurrencia en gastos de transporte, mano de obra y pérdida de
            chance. Sin perjuicio de lo anterior LA CONTRATISTA, podrá proceder
            al armado de la vivienda, bajo las condiciones especiales que pacte
            con EL COMITENTE, y a riesgo exclusivo de la misma en los supuestos
            A. y B.
          </p>
        </Clausula>
        <Clausula>
          <h3>CUARTA: PRECIO-FORMA DE PAGO</h3>
          {/* <p>
            {modeloContratado.forma_pago === "contado" ? (
              `Contado: El precio total del presente contrato es fijado en la suma de $${modeloContratado.precio_final.toLocaleString()} 
              (Pesos ${numeroALetras(
                modeloContratado.precio_final
              )} y 0/100 centavos)`
            ) : (
              <>
                Contado Diferido: El precio total del presente contrato es
                fijado en la suma de $
                {modeloContratado.precio_final.toLocaleString()}, cantidad que
                EL COMITENTE se obliga a abonar de la siguiente forma: anticipo
                de ${modeloContratado.anticipo.toLocaleString()}, y el saldo en{" "}
                {modeloContratado.cuotas} cuotas iguales y consecutivas de $
                {modeloContratado.valor_cuota.toLocaleString()} cada una,
                abonando la primer cuota a los 30 días de haber saldado el
                anticipo fijado, siendo el vencimiento de las restantes el mismo
                día de los meses subsiguientes.
              </>
            )}
          </p> */}
          <p>
            <strong>Lugar de pago:</strong> Las cuotas serán abonadas entre el 1
            y 10 días del mes que corresponda a cada una de ellas en Iraola 925
            - Parque Industrial La Victoria, Venado Tuerto.
          </p>
          <p>
            <strong>INTERESES:</strong>
            <br />
            La falta de cumplimiento en tiempo y forma de los pagos provocará el
            devengamiento de intereses compensatorios de 7% mensual a los que se
            adicionará un 3% en concepto de punitorios, que conforme la
            condición de mora automática se adicionará al pago que se efectúe
            tardíamente. En el caso que sea exigible la totalidad del saldo
            deudor como consecuencia de la caducidad de los plazos, los
            intereses fijados más arriba se devengarán a partir de la
            notificación fehaciente a EL COMITENTE de la voluntad de LA
            CONTRATISTA de dar por caduco todo plazo acordado.
          </p>
        </Clausula>
        <Clausula>
          <h3>QUINTA: MORA</h3>
          <p>
            Las partes pactan que la mora se producirá de manera automática por
            la falta de cumplimento en legal forma de las condiciones y
            modalidades de las obligaciones pactadas en el presente contrato no
            siendo necesaria la interpelación judicial o extrajudicial alguna
            para su constitución.
          </p>
          <p>
            <strong>REFORMULACION DEL PRECIO DEL CONTRATO.</strong>
            <br />
            En supuestos de mora de más de tres meses en el pago de cuotas del
            contrato, y sin perjuicio de lo dispuesto en la cláusula CUARTA en
            relación al anticipo, LA CONTRATISTA tendrá derecho a la
            reformulación del saldo del contrato conforme precio al momento de
            la normalización y reconducción del pago o eventual ejecución y
            cobro, pudiendo mantener la forma de pago convenida en el contrato,
            a su solo criterio en el primer supuesto.
          </p>
        </Clausula>
        <Clausula>
          <h3>SEXTA: RESCISION</h3>
          <p>
            Sin perjuicio del derecho de rescisión de que ambas partes gozan
            conforme ley aplicable, se pacta expresamente que LA CONTRATISTA,
            tendrá derecho a rescindir unilateralmente y a su sola voluntad, el
            presente contrato en los siguientes supuestos:
          </p>
          <ol>
            <li>Falta de pago de suma alguna de anticipo.</li>
            <li>
              Falta de pago de dos cuotas seguidas o cinco alternadas del
              anticipo.
            </li>
            <li>
              Falta de pago de cuotas del contrato, aún en el caso que el
              anticipo hubiere sido pagado, en cuando el mismo no fuere igual o
              superior al 40 % del total del precio.
            </li>
            <li>
              Haberse producido algunos de los hechos que describe la cláusula
              TERCERA, inciso A) o B)
            </li>
            <li>
              Falta de constitución en tiempo y forma de la garantía de pago del
              presente contrato.
            </li>
          </ol>
          <p>
            En estos supuestos las sumas entregadas serán aplicadas a daños y
            perjuicios ocasionados a LA CONTRATISTA en cuanto costos de mano de
            obra, materiales, pérdida de chance y/o cualquier otra que hubiere
            generado la suscripción del contrato y/o su principio de ejecución,
            no teniendo EL COMITENTE derecho a reclamo alguno.
          </p>
        </Clausula>
        <Clausula>
          <h3>SEPTIMA: CADUCIDAD DE LOS PLAZOS</h3>
          <p>
            Sin perjuicio del derecho rescisorio que pudiere ejercer LA
            CONTRATISTA, conforme la cláusula sexta, las partes pactan que la
            falta de pago dentro del plazo estipulado de dos cuotas del saldo
            del precio ya sean estas alternadas o consecutivas, dará derecho a
            LA CONTRATISTA, a dar por caducos todos los plazos acordados para el
            pago de precio pactado, haciéndose exigible el saldo del precio en
            su totalidad y desde el momento de producirse la mora.
          </p>
          <p>
            La voluntad de dar por caduco los plazos deberá ser notificada por
            LA CONTRATISTA por medio fehaciente y acordando un plazo no menor de
            15 días para que EL COMITENTE pueda dar cumplimiento al pago de la
            totalidad del saldo requerido.
          </p>
        </Clausula>
        <Clausula>
          <h3>OCTAVA: ENTREGA DE LOS COMPONENTES- CONDICIONES</h3>
          <p>
            La entrega de los componentes fijados en el ANEXO III, se efectuará
            una vez que fuere pagado el anticipo fijado en el presente contrato,
            así como los gastos administrativos del total de la operacion
            efectuada (3,5% sobre saldo financiado), el sellado del presente y
            documentos que genera el mismo.
          </p>
          <p>
            Se deja establecido que en caso de demora en la entrega y/o armado
            de los componentes fundada en caso fortuito o fuerza mayor, huelga
            del personal, la falta en plaza de los elementos para la elaboración
            de los componentes o cualquier otra causa o hecho imprevisto no
            imputable a LA CONTRATISTA que impida a esta última dar cumplimiento
            de lo pactado en este contrato no lo hará responsable de las
            consecuencias del retardo.
          </p>
        </Clausula>
        <Clausula>
          <h3>NOVENA: TRASLADO DE LOS COMPONENTES- ARMADO</h3>
          <p>
            Los elementos constitutivos de la vivienda serán entregados al
            COMITENTE "en fábrica" por lo que todos los gastos que irrogue el
            traslado de los mismos serán a cargo exclusivo de EL COMITENTE.
          </p>
        </Clausula>
        <Clausula>
          <h3>DECIMA:</h3>
          <p>
            EL COMITENTE toma a su exclusivo cargo todo trámite de gestión para
            la obtención de los permisos indispensables para la instalación y/o
            habilitación que correspondiera de la vivienda de que se trate,
            incluyendo sin limitar provisiones de servicios domiciliarios,
            eximiendo a la locadora toda responsabilidad por los resultados de
            dichas gestiones.
          </p>
        </Clausula>
        <Clausula>
          <h3>DECIMO PRIMERA:</h3>
          <p>
            Cumplido el pago del anticipo por parte de EL COMITENTE para el
            posterior armado y antes del mismo EL COMITENTE se obliga a aportar
            a LA CONTRATISTA, conforme anexo V, las garantías reales y/o
            personales a satisfacción de este último, que se constituyan en
            LISO, LLANO, PRINCIPAL PAGADOR de todas las
          </p>
        </Clausula>
        <Clausula>
          <h3>DECIMO SEGUNDA: FIJACION DE DOMICILIO</h3>
          <p>
            Para todos los efectos del presente contrato, las partes fijan
            domicilio especial en los que respectivamente han denunciado en el
            encabezado del presente, siendo en dichos lugares eficaces todas las
            notificaciones y/o intimaciones que se cursen ya sean judiciales o
            extrajudiciales debiendo quien modifique los mismos hacerlo saber a
            LA CONTRATISTA por medio de carta documento y/o telegrama
            colacionado y/u otro medio fehaciente.
          </p>
        </Clausula>
      </ContratoContent>
      <ContratoFooter>
        <p>
          En la ciudad de{" "}
          <span className="uppercase font-bold">{cliente.address?.city}</span>{" "}
          provincia de{" "}
          <span className="uppercase font-bold">{cliente.address?.state}</span>{" "}
          a los{" "}
          {new Date(cliente?.contractHome?.date_contract_generated).getDate()}{" "}
          días del mes de{" "}
          {
            meses[
              new Date(
                cliente?.contractHome?.date_contract_generated
              ).getMonth()
            ]
          }{" "}
          del año{" "}
          {new Date(
            cliente?.contractHome?.date_contract_generated
          ).getFullYear()}{" "}
          se firman dos ejemplares de un mismo tener y efecto.
        </p>
        <FirmasContainer>
          <Firma>
            <Line />
            <p>LA CONTRATISTA</p>
          </Firma>
          <Firma>
            <Line />
            <p>EL COMITENTE</p>
          </Firma>
        </FirmasContainer>
      </ContratoFooter>
      <AccionesContainer>
        <PDFDownloadLink
          document={
            <ContratoPDF
              usuario={auth}
              cliente={cliente}
              modeloContratado={modeloContratado}
              meses={meses}
            />
          }
          fileName={`contrato-${cliente.fantasyName}-${cliente?.contractNumber}.pdf`}
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
                  Descargar PDF CONTRATO
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
        <Button className="flex gap-2" onClick={handleOpenModal}>
          VER contrato PDF <Eye />
        </Button>
      </AccionesContainer>
      <ModalPDF
        usuario={auth}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cliente={cliente}
        modeloContratado={modeloContratado}
        meses={meses}
      />
    </ContratoContainer>
  );
};

// Styled Components
const ContratoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
  font-size: 14px;
  line-height: 1.6;
  border: 1px solid rgba(223, 223, 223, 0.722);
  @media print {
    box-shadow: none;
    padding: 0;
  }
`;

const ContratoHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h2 {
    font-size: 1.5rem;
    color: #1f2937;
  }
`;

const ContratoContent = styled.div`
  margin-bottom: 2rem;
`;

const Parrafo = styled.p`
  margin-bottom: 1.5rem;
  text-align: justify;
`;

const Clausula = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
    text-align: justify;
  }

  ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const ContratoFooter = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const FirmasContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

const Firma = styled.div`
  width: 200px;
  text-align: center;
`;

const Line = styled.div`
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
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

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ComposicionesContainer = styled.div`
  margin: 1rem 0;
`;

const ComposicionItem = styled.div`
  margin-bottom: 0.5rem;
`;

const ListaOrdenada = styled.ol`
  list-style-type: upper-alpha;
  margin-left: 1.5rem;
  margin-bottom: 1rem;

  li {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }
`;
export default ContratoVivienda;
