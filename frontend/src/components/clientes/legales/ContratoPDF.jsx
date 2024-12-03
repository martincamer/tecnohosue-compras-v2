import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatearDinero } from "../../../utils/formatearDinero";
import { numeroALetras } from "../../../utils/numeroALetras";

// Registrar fuente
Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1s.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Poppins",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contractNumber: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  paragraph: {
    marginBottom: 10,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  clausula: {
    marginBottom: 15,
  },
  clausulaTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  list: {
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 5,
  },
  composicionesContainer: {
    marginVertical: 10,
  },
  composicionItem: {
    marginBottom: 5,
  },
  underline: {
    textDecoration: "underline",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
  },
  firmas: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  firma: {
    width: 200,
    borderTopWidth: 1,
    borderColor: "black",
    paddingTop: 5,
    textAlign: "center",
  },
  marginTop: {
    marginTop: 15,
  },
  contractSection: {
    marginBottom: 20,
    padding: 10,
    borderBottom: "1px solid #000",
  },
  contractTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  contractValue: {
    fontSize: 12,
  },
});

const ContratoPDF = ({ cliente, modeloContratado, meses, usuario }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tecno Operaciones</Text>
        <Text style={styles.contractNumber}>
          Contrato {cliente.fantasyName} {cliente?.contractNumber}
        </Text>
      </View>

      {/* Nueva sección para el número de contrato */}
      <View style={styles.contractSection}>
        <Text style={styles.contractTitle}>Número de Contrato:</Text>
        <Text style={styles.contractValue}>{cliente?.contractNumber}</Text>
      </View>

      {/* Párrafo inicial */}
      <View style={styles.paragraph}>
        <Text>
          Entre{" "}
          <Text style={[styles.bold]}>
            Viviendas Tecno Operaciones S.R.L. 30-71083448-9
          </Text>
          , con domicilio en calle Iraola 925 de la ciudad de{" "}
          <Text style={styles.bold}>Venado Tuerto</Text>, provincia de{" "}
          <Text style={styles.bold}>Santa Fe</Text>, por una parte y en adelante
          llamada LA CONTRATISTA y el/la Sr./Sra.{" "}
          <Text style={[styles.bold, styles.uppercase]}>
            {cliente.fantasyName}
          </Text>
          , titular del Documento de Identidad{" "}
          <Text style={styles.bold}>{cliente?.documentNumber}</Text> con
          domicilio real en{" "}
          <Text style={[styles.bold, styles.uppercase]}>
            {cliente?.address?.street}
          </Text>{" "}
          de la ciudad de{" "}
          <Text style={[styles.bold, styles.uppercase]}>
            {cliente?.address?.city}
          </Text>
          , provincia de{" "}
          <Text style={[styles.bold, styles.uppercase]}>
            {cliente?.address?.state}
          </Text>{" "}
          por otra parte y, en adelante llamada EL COMITENTE, se conviene la
          celebración del presente contrato, el que se regirá por lo dispuesto
          por las cláusulas y supletoriamente por lo dispuesto en el Código
          Civil en lo que fuera pertinente.
        </Text>
      </View>

      {/* PRIMERA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>PRIMERA:</Text>
        <Text>EL COMITENTE solicita a LA CONTRATISTA:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            A) La fabricación de elementos constitutivos de una vivienda{" "}
            <Text style={[styles.bold, styles.uppercase]}>
              {modeloContratado?.nombre}
            </Text>{" "}
            de{" "}
            <Text style={[styles.bold, styles.uppercase]}>
              {modeloContratado?.totalMetrosCuadrados}
            </Text>{" "}
            m² de superficie cubierta, medidas interiores en metros y conforme
            las condiciones técnicas que se señalan en el ANEXO I, que forma
            parte integrante del presente contrato.
          </Text>
          <Text style={styles.listItem}>
            B) El armado de la vivienda a que se refiere el punto A.
          </Text>
        </View>
        <Text style={styles.paragraph}>
          El presente contrato no involucra una vivienda llave en mano,
          encontrándose sujeto a las condiciones particulares de cada caso.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>LA CONTRATISTA</Text> se obliga al
          cumplimiento del objeto solicitado, fijando ambas partes que la
          fabricación de los elementos constitutivos y el armado de la vivienda,
          constituyen un solo objeto contractual único e inescindible. La
          descripción de los elementos constitutivos se señalan en el ANEXO III
          del presente contrato, formando parte del mismo.
        </Text>
        <Text style={[styles.paragraph, styles.underline]}>
          El armado de la vivienda no incluye la base o platea sobre la que se
          plantará la misma, siendo la ejecución de la misma por cuenta y costo
          de EL COMITENTE.
        </Text>
        <Text style={styles.paragraph}>
          En tal sentido EL COMITENTE se obliga a la realización de la base, con
          materiales adecuados y suficientes, que permitan el armado de la
          vivienda sobre la mencionada platea, todo ello conforme al ANEXO IV
          del presente contrato, siendo los datos y demás condiciones del
          terreno responsabilidad exclusiva de EL COMITENTE y no sujetos a
          verificación por parte de LA CONTRATISTA.
        </Text>
        <Text style={styles.paragraph}>
          Asimismo queda bajo responsabilidad de EL COMITENTE la realización de
          la carpeta interior de la vivienda que permite la fijación de las
          paredes impidiendo que las mismas sufran roturas o desplazamientos y
          ello, en un plazo de 24 horas a partir de la fecha de armado de los
          elementos constitutivos, objeto de este contrato.
        </Text>
        <Text style={styles.paragraph}>
          Será obligación de EL COMITENTE, el mantenimiento de todos los
          elementos constitutivos de la vivienda luego de su armado y entrega,
          así como las condiciones sus sellados, para evitar los efectos que
          pudieran afectarlos incluyendo sin limitar humedades, resecamiento,
          agrietamiento y deformación de las maderas, así como eventuales
          plagas.
        </Text>
      </View>

      {/* SEGUNDA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>SEGUNDA:</Text>
        <Text style={styles.paragraph}>
          Sin perjuicio de lo establecido en la cláusula PRIMERA, EL COMITENTE
          solicita a LA CONTRATISTA, la modificación del modelo señalado
          conforme lo siguiente:
        </Text>
        <View style={styles.composicionesContainer}>
          {modeloContratado?.composiciones?.map((comp, index) => (
            <Text key={index} style={styles.composicionItem}>
              1- {comp.articulo}{" "}
              ------------------------------------------------ {comp.ancho}m x{" "}
              {comp.largo}m{comp.observaciones && ` - ${comp.observaciones}`}
            </Text>
          ))}
        </View>
        <Text style={styles.paragraph}>
          Siendo la misma acorde a sus necesidades habitacionales. LA
          CONTRATISTA acepta las modificaciones en la medida que no obliguen al
          cambio de las condiciones técnicas del ANEXO I antes mencionado y
          adjunto. EL COMITENTE se obliga a mantener la descripción y
          constitución del objeto contratado y mantener la misma al momento del
          armado de la vivienda.
        </Text>
      </View>

      {/* TERCERA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>TERCERA:</Text>
        <Text style={styles.paragraph}>
          Siendo que LA CONTRATISTA se hace cargo del armado de la vivienda, en
          lote o terreno de propiedad de EL COMITENTE o sobre el cual la misma
          tuviere derecho, el mismo deberá indicar ubicación geográfica y
          acreditar vinculación con el lugar de posterior armado de la vivienda
          y medidas del mismo. Estas últimas se agregan en el ANEXO IV, siendo
          su precisión y justeza de responsabilidad de EL COMITENTE.
        </Text>
        <Text style={styles.paragraph}>
          LA CONTRATISTA puede rehusarse a armar la vivienda en el lote señalado
          por el COMITENTE cuando:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            1. No se acreditare relación alguna del lote con el signatario del
            contrato.
          </Text>
          <Text style={styles.listItem}>
            2. Cuando no se hubiere construido la platea o base de apoyo de la
            que se señala en el anexo IV cláusula CUARTA del presente, o la
            misma estuviere ejecutada fuera de las normas de buenas prácticas de
            construcción, y/o dicha platea se encontrare fuera de la indicación
            física y/o material que señala el respectivo anexo.
          </Text>
          <Text style={styles.listItem}>
            3. No se encontraren los pagos acordados en el contrato efectivizado
            al momento del armado, y sin perjuicio de lo dispuesto por la
            cláusula SEXTA del presente contrato.
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Cualquiera de estas conductas de EL COMITENTE provocan el nacimiento
          de daños y perjuicios a favor de LA CONTRATISTA, en tanto efectiva
          incurrencia en gastos de transporte, mano de obra y pérdida de chance.
          Sin perjuicio de lo anterior LA CONTRATISTA, podrá proceder al armado
          de la vivienda, bajo las condiciones especiales que pacte con EL
          COMITENTE, y a riesgo exclusivo de la misma en los supuestos A. y B.
        </Text>
      </View>

      {/* CUARTA */}
      <View style={styles.clausula}>
        <Text style={styles?.clausulaTitle}>CUARTA: PRECIO-FORMA DE PAGO</Text>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: "4px",
            fontSize: "10px",
            textTransform: "uppercase",
          }}
        >
          {(modeloContratado.forma_pago === "anticipo_cuotas" &&
            "Anticipo + Cuotas") ||
            (modeloContratado.forma_pago === "todo_financiado" &&
              "Todo Financiado") ||
            (modeloContratado.forma_pago === "contado" && "Contado") ||
            (modeloContratado.forma_pago === "contado_diferido" &&
              "Contado Diferido")}
        </Text>
        <Text style={styles?.paragraph}>
          {modeloContratado?.forma_pago === "contado" && (
            <>
              El precio total del presente contrato es fijado en la suma de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.precio_final)} (
                {numeroALetras(modeloContratado?.precio_final)})
              </Text>
              , habiendo recibido LA CONTRATISTA antes de ese acto la suma de
              Pesos{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.pagado)} (
                {numeroALetras(modeloContratado?.pagado)})
              </Text>
              , siendo el presente suficiente recibo y obligándose al pago del
              saldo esto es{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(
                  modeloContratado?.precio_final - modeloContratado?.pagado
                )}{" "}
                (
                {numeroALetras(
                  modeloContratado?.precio_final - modeloContratado?.pagado
                )}
                )
              </Text>{" "}
              , 48 hs antes de la entrega de los elementos constitutivos.
            </>
          )}
          {modeloContratado?.forma_pago === "todo_financiado" && (
            <>
              El precio total del presente contrato es fijado en la suma de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.precio_final)} (
                {numeroALetras(modeloContratado?.precio_final)})
              </Text>{" "}
              , cantidad que EL COMITENTE se obliga a abonar de la siguiente
              forma:{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {modeloContratado?.cuotas}
              </Text>{" "}
              cuotas iguales y consecutivas de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.valor_cuota)} (
                {numeroALetras(modeloContratado?.valor_cuota)})
              </Text>{" "}
              (LISTA N°........) operando el vencimiento de cada cuota de ella a
              los 30 días de la suscripción del presente contrato, siendo el
              vencimiento de las restantes el mismo día de los meses
              subsiguientes. La entrega de los elementos constitutivos de la
              vivienda opera a partir del pago de la cuota número 15 (quince),
              debiendo EL COMITENTE efectivizar antes de la entrega las
              condiciones estipuladas en la CLAUSULA DECIMO PRIMERA del presente
              contrato. A los fines de este contrato se considera ANTICIPO el
              equivalente a las primeras 15 (quince). En caso que no se
              cumpliera con el pago del ANTICIPO en los primeros 15 meses de
              vigencia del contrato, existiendo mora en las cuotas cualquiera
              fuera la misma, a solo criterio de LA CONTRATISTA esta podrá
              reformular el valor del saldo del contrato conforme precio al
              momento de la finalización del pago, o rescindir el contrato,
              devolviendo hasta el 50% del valor entregado por EL COMITENTE.
            </>
          )}
          {modeloContratado?.forma_pago === "contado_diferido" && (
            <>
              El precio total del presente contrato es fijado en la suma de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.precio_final)} (
                {numeroALetras(modeloContratado?.precio_final)})
              </Text>{" "}
              , cantidad que EL COMITENTE se obliga a abonar de la siguiente
              forma: anticipo de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.anticipo)} (
                {numeroALetras(modeloContratado?.anticipo)})
              </Text>{" "}
              ,(LISTA N°.........) habiendo recibido LA CONTRATISTA antes de
              este acto la suma de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.pagado)} (
                {numeroALetras(modeloContratado?.pagado)})
              </Text>{" "}
              que se imputan al anticipo fijado, el resto del anticipo EL
              COMITENTE se obliga a pagarlo en{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                1
              </Text>{" "}
              cuotas de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.anticipo)} (
                {numeroALetras(modeloContratado?.anticipo)})
              </Text>{" "}
              . El saldo del precio se obliga EL COMITENTE a cancelarlo de la
              siguiente forma,{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {modeloContratado?.cuotas}
              </Text>{" "}
              cuotas iguales y consecutivas de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.valor_cuota)} (
                {numeroALetras(modeloContratado?.valor_cuota)})
              </Text>{" "}
              , abonando la primer cuota a los 30 días de haber saldado el
              anticipo fijado, siendo el vencimiento de las restantes el mismo
              día de los meses subsiguientes. En ningún caso el plazo para la
              cancelación del anticipo será superior a 30 dias a partir de la
              firma del contrato, salvo acuerdo expreso de partes. Sin perjuicio
              de lo anterior y en caso de que el pago del anticipo se efectúe en
              período superior a un tres meses, a solo criterio de LA
              CONTRATISTA esta podrá reformular el valor del saldo del contrato
              conforme precio al momento de la finalización del pago, o
              rescindir el contrato, devolviendo hasta el 50 % del valor
              entregado por EL COMITENTE.
            </>
          )}
          {modeloContratado?.forma_pago === "anticipo_cuotas" && (
            <>
              El precio total del presente contrato es fijado en la suma de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.precio_final)} (
                {numeroALetras(modeloContratado?.precio_final)})
              </Text>
              , cantidad que EL COMITENTE se obliga a abonar de la siguiente
              forma: anticipo de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.anticipo)} (
                {numeroALetras(modeloContratado?.anticipo)})
              </Text>
              , (LISTA N° ......... ) habiendo recibido LA CONTRATISTA antes de
              este acto la suma de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.pagado)} (
                {numeroALetras(modeloContratado?.pagado)})
              </Text>
              . El saldo del precio se obliga EL COMITENTE a cancelarlo de la
              siguiente forma,{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {modeloContratado?.cuotas}
              </Text>{" "}
              cuotas iguales y consecutivas de{" "}
              <Text
                style={{
                  fontWeight: "semibold",
                }}
              >
                {formatearDinero(modeloContratado?.valor_cuota)} (
                {numeroALetras(modeloContratado?.valor_cuota)})
              </Text>{" "}
              cada una, operando el vencimiento de la primera de ellas a los 30
              días de saldado el anticipo, siendo el vencimiento de las
              restantes el mismo día de los meses subsiguientes. En ningún caso
              el plazo para la cancelación del anticipo será superior a 30 dias
              a partir de la firma del contrato, salvo acuerdo expreso de
              partes. Sin perjuicio de lo anterior y en caso de que el pago del
              anticipo se efectúe en período superior a un tres meses, a solo
              criterio de LA CONTRATISTA esta podrá reformular el valor del
              saldo del contrato conforme precio al momento de la finalización
              del pago, o rescindir el contrato, devolviendo hasta el 50% del
              valor entregado por EL COMITENTE.
            </>
          )}
        </Text>
        {modeloContratado?.cuotas && (
          <Text style={styles.paragraph}>
            Lugar de pago: Las cuotas serán abonadas entre el 1 y 10 días del
            mes que corresponda a cada una de ellas en Iraola 925 - Parque
            Industrial, Venado Tuerto.
          </Text>
        )}

        <Text style={[styles.clausulaTitle, styles.marginTop]}>INTERESES:</Text>
        <Text style={styles.paragraph}>
          La falta de cumplimiento en tiempo y forma de los pagos provocará el
          devengamiento de intereses compensatorios de 7% mensual a los que se
          adicionará un 3% en concepto de punitorios, que conforme la condición
          de mora automática se adicionará al pago que se efectúe tardíamente.
          En el caso que sea exigible la totalidad del saldo deudor como
          consecuencia de la caducidad de los plazos, los intereses fijados más
          arriba se devengarán a partir de la notificación fehaciente a EL
          COMITENTE de la voluntad de LA CONTRATISTA de dar por caduco todo
          plazo acordado.
        </Text>
      </View>

      {/* QUINTA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>QUINTA: MORA</Text>
        <Text style={styles.paragraph}>
          Las partes pactan que la mora se producirá de manera automática por la
          falta de cumplimento en legal forma de las condiciones y modalidades
          de las obligaciones pactadas en el presente contrato no siendo
          necesaria la interpelación judicial o extrajudicial alguna para su
          constitución.
        </Text>
        <Text style={[styles.bold, styles.paragraph]}>
          REFORMULACION DEL PRECIO DEL CONTRATO.
        </Text>
        <Text style={styles.paragraph}>
          En supuestos de mora de más de tres meses en el pago de cuotas del
          contrato, y sin perjuicio de lo dispuesto en la cláusula CUARTA en
          relación al anticipo, LA CONTRATISTA tendrá derecho a la reformulación
          del saldo del contrato conforme precio al momento de la normalización
          y reconducción del pago o eventual ejecución y cobro, pudiendo
          mantener la forma de pago convenida en el contrato, a su solo criterio
          en el primer supuesto.
        </Text>
      </View>

      {/* SEXTA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>SEXTA: RESCISION</Text>
        <Text style={styles.paragraph}>
          Sin perjuicio del derecho de rescisión de que ambas partes gozan
          conforme ley aplicable, se pacta expresamente que LA CONTRATISTA,
          tendrá derecho a rescindir unilateralmente y a su sola voluntad, el
          presente contrato en los siguientes supuestos:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            1. Falta de pago de suma alguna de anticipo.
          </Text>
          <Text style={styles.listItem}>
            2. Falta de pago de dos cuotas seguidas o cinco alternadas del
            anticipo.
          </Text>
          <Text style={styles.listItem}>
            3. Falta de pago de cuotas del contrato, aún en el caso que el
            anticipo hubiere sido pagado, en cuando el mismo no fuere igual o
            superior al 40 % del total del precio.
          </Text>
          <Text style={styles.listItem}>
            4. Haberse producido algunos de los hechos que describe la cláusula
            TERCERA, inciso A) o B)
          </Text>
          <Text style={styles.listItem}>
            5. Falta de constitución en tiempo y forma de la garantía de pago
            del presente contrato.
          </Text>
        </View>
        <Text style={styles.paragraph}>
          En estos supuestos las sumas entregadas serán aplicadas a daños y
          perjuicios ocasionados a LA CONTRATISTA en cuanto costos de mano de
          obra, materiales, pérdida de chance y/o cualquier otra que hubiere
          generado la suscripción del contrato y/o su principio de ejecución, no
          teniendo EL COMITENTE derecho a reclamo alguno.
        </Text>
      </View>

      {/* SEPTIMA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>
          SEPTIMA: CADUCIDAD DE LOS PLAZOS
        </Text>
        <Text style={styles.paragraph}>
          Sin perjuicio del derecho rescisorio que pudiere ejercer LA
          CONTRATISTA, conforme la cláusula sexta, las partes pactan que la
          falta de pago dentro del plazo estipulado de dos cuotas del saldo del
          precio ya sean estas alternadas o consecutivas, dará derecho a LA
          CONTRATISTA, a dar por caducos todos los plazos acordados para el pago
          de precio pactado, haciéndose exigible el saldo del precio en su
          totalidad y desde el momento de producirse la mora.
        </Text>
        <Text style={styles.paragraph}>
          La voluntad de dar por caduco los plazos deberá ser notificada por LA
          CONTRATISTA por medio fehaciente y acordando un plazo no menor de 15
          días para que EL COMITENTE pueda dar cumplimiento al pago de la
          totalidad del saldo requerido.
        </Text>
      </View>

      {/* OCTAVA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>
          OCTAVA: ENTREGA DE LOS COMPONENTES- CONDICIONES
        </Text>
        <Text style={styles.paragraph}>
          La entrega de los componentes fijados en el ANEXO III, se efectuará
          una vez que fuere pagado el anticipo fijado en el presente contrato,
          así como los gastos administrativos del total de la operacion
          efectuada (3,5% sobre saldo financiado), el sellado del presente y
          documentos que genera el mismo.
        </Text>
        <Text style={styles.paragraph}>
          Se deja establecido que en caso de demora en la entrega y/o armado de
          los componentes fundada en caso fortuito o fuerza mayor, huelga del
          personal, la falta en plaza de los elementos para la elaboración de
          los componentes o cualquier otra causa o hecho imprevisto no imputable
          a LA CONTRATISTA que impida a esta última dar cumplimiento de lo
          pactado en este contrato no lo hará responsable de las consecuencias
          del retardo.
        </Text>
      </View>

      {/* NOVENA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>
          NOVENA: TRASLADO DE LOS COMPONENTES- ARMADO
        </Text>
        <Text style={styles.paragraph}>
          Los elementos constitutivos de la vivienda serán entregados al
          COMITENTE "en fábrica" por lo que todos los gastos que irrogue el
          traslado de los mismos serán a cargo exclusivo de EL COMITENTE.
        </Text>
      </View>

      {/* DECIMA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>DECIMA:</Text>
        <Text style={styles.paragraph}>
          EL COMITENTE toma a su exclusivo cargo todo trámite de gestión para la
          obtención de los permisos indispensables para la instalación y/o
          habilitación que correspondiera de la vivienda de que se trate,
          incluyendo sin limitar provisiones de servicios domiciliarios,
          eximiendo a la locadora toda responsabilidad por los resultados de
          dichas gestiones.
        </Text>
      </View>

      {/* DECIMO PRIMERA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>DECIMO PRIMERA:</Text>
        <Text style={styles.paragraph}>
          Cumplido el pago del anticipo por parte de EL COMITENTE para el
          posterior armado y antes del mismo EL COMITENTE se obliga a aportar a
          LA CONTRATISTA, conforme anexo V, las garantías reales y/o personales
          a satisfacción de este último, que se constituyan en LISO, LLANO,
          PRINCIPAL PAGADOR de todas las
        </Text>
      </View>

      {/* DECIMO SEGUNDA */}
      <View style={styles.clausula}>
        <Text style={styles.clausulaTitle}>
          DECIMO SEGUNDA: FIJACION DE DOMICILIO
        </Text>
        <Text style={styles.paragraph}>
          Para todos los efectos del presente contrato, las partes fijan
          domicilio especial en los que respectivamente han denunciado en el
          encabezado del presente, siendo en dichos lugares eficaces todas las
          notificaciones y/o intimaciones que se cursen ya sean judiciales o
          extrajudiciales debiendo quien modifique los mismos hacerlo saber a LA
          CONTRATISTA por medio de carta documento y/o telegrama colacionado y/u
          otro medio fehaciente.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          En la ciudad de{" "}
          <Text style={[styles.uppercase, styles.bold]}>
            {usuario.user.localidad},{usuario.user.direccion}
          </Text>{" "}
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
        </Text>

        <View style={styles.firmas}>
          <View style={styles.firma}>
            <Text>LA CONTRATISTA</Text>
          </View>
          <View style={styles.firma}>
            <Text>EL COMITENTE</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ContratoPDF;
