import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  paragraph: {
    marginBottom: 10,
    textAlign: "justify",
  },
  separator: {
    borderBottom: 1,
    borderColor: "#000",
    marginVertical: 15,
    width: "100%",
  },
  firma: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  firmaLabel: {
    marginRight: 10,
  },
  firmaLinea: {
    flex: 1,
    borderBottom: 1,
    borderColor: "#000",
  },
});

const GarantiasPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>TECNO OPERACIONES</Text>
      <Text style={styles.title}>ANEXO V - GARANTÍAS</Text>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          El presente anexo fija el marco dentro del cual serán aceptadas las
          garantías del contrato en calidad y cantidad.
        </Text>

        <Text style={styles.paragraph}>
          Contado diferido y hasta diez cuotas: El adquiriente deberá contar
          con: Dos garantías reales, o, Una garantía real y otra garantía
          personal.
        </Text>

        <Text style={styles.paragraph}>
          Anticipo y más de diez cuotas: El adquiriente deberá contar con: Dos
          garantías reales y una garantía personal, o, Una garantía real y dos
          garantías personales
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Se entiende por garantía real: que el garante debe contar con un
          título de propiedad inmobiliaria a su nombre libre de embargos e
          hipotecas, no afectado a bien de familia.
        </Text>

        <Text style={styles.paragraph}>
          No son garantías reales aceptadas por SISTEMA DE VIVIENDAS TECNOHOGAR
          SRL, los boletos de compraventa, salvo que estuvieren inscriptos ante
          el Registro de Propiedad respectivo y los bienes que estuvieren en
          trámite sucesorio.
        </Text>

        <Text style={styles.paragraph}>
          En ningún caso se aceptarán como garantes los titulares de bienes
          inmuebles que se encontraren inhibidos, en quiebra, concurso
          preventivo de acreedores o en cualquier otro procedimiento que pusiera
          en peligro los bienes que se ofrezcan como garantía de cumplimiento
          del contrato.
        </Text>

        <Text style={styles.paragraph}>
          Se entiende por garantía personal: que el garante debe contar con
          recibo de sueldo suficiente como para poder afrontar la
          responsabilidad que genera el monto del contrato. La antigüedad en el
          puesto de trabajo será esencial para la consideración de la validez de
          la fianza.
        </Text>

        <Text style={styles.paragraph}>
          No son garantías personales aceptadas por SISTEMA DE VIVIENDAS
          TECNOHOGAR SRL, los haberes jubilatorios, la condición de
          monotributista, sueldos o retribuciones que por su caracter sean
          inembargables.
        </Text>

        <Text style={styles.paragraph}>
          Sistema de Viviendas Tecno Operaciones se reserva al derecho de
          rechazar las garantías que presentadas, a su solo criterio, no
          tuvieran las condiciones pretendidas.
        </Text>
      </View>

      <View style={styles.firma}>
        <Text style={styles.firmaLabel}>Firma conforme:</Text>
        <View style={styles.firmaLinea} />
      </View>
    </Page>
  </Document>
);

export default GarantiasPDF;
