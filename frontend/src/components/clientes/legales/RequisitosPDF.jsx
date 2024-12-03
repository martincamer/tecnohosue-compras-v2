import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
    fontSize: 10,
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
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    marginLeft: 20,
    marginBottom: 10,
  },
  important: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  warning: {
    marginTop: 15,
    fontStyle: "italic",
  },
  firma: {
    marginTop: 30,
    borderTop: 1,
    borderColor: "#000",
    width: 250,
    textAlign: "center",
    paddingTop: 5,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
});

const RequisitosPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>REQUISITOS DE DOCUMENTACIÓN</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ADQUIRIENTE:</Text>
        <Text style={styles.content}>
          COMPLETA TITULAR DEL CONTRATO, ADJUNTANDO FOTOCOPIA DEL DNI (1º Y 2º
          HOJA). FIRMA AL PIE.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CO-DEUDOR:</Text>
        <Text style={styles.content}>
          COMPLETAN LOS TRES (3) GARANTES, ADJUNTANDO CADA UNO DE ELLOS,
          FOTOCOPIA DEL DNI (1º Y 2º HOJA) Y ULTIMO RECIBO DE SUELDO. FIRMA AL
          PIE.
        </Text>
        <Text style={styles.content}>
          (EN CASO QUE UNO DE LOS GARANTES, PRESENTE ESCRITURA PROPIETARIA; LA
          MISMA NO PUEDE SER BIEN DE FAMILIA).
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.important}>
          NO SE ACEPTAN: ESCRITURAS EN JUICIO SUCESORIO. BOLETO DE COMPRA VENTA.
          MONOTRIBUTOS. HABERES JUBILATORIOS.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PAGARÉ:</Text>
        <Text style={styles.content}>LO FIRMAN EL TITULAR Y LOS GARANTES.</Text>

        <View style={styles.content}>
          <Text>
            LIBRADOR: ES EL TITULAR DEL CONTRATO. COMPLETA LOS DATOS
            SOLICITADOS. FIRMA Y ACLARA A LA DERECHA.
          </Text>
          <Text>
            POR AVAL: PRIMER GARANTE. COMPLETA LOS DATOS SOLICITADOS. FIRMA Y
            ACLARA A LA DERECHA.
          </Text>
          <Text>
            POR AVAL: SEGUNDO GARANTE. COMPLETA LOS DATOS SOLICITADOS. FIRMA Y
            ACLARA A LA DERECHA.
          </Text>
          <Text>
            POR AVAL: TERCER GARANTE. COMPLETA LOS DATOS SOLICITADOS. FIRMA Y
            ACLARA A LA DERECHA.
          </Text>
        </View>
      </View>

      <Text style={styles.important}>
        LAS FIRMAS DEBEN ESTAR CERTIFICADAS ANTE UN ESCRIBANO. NO SE COMPLETAN
        FECHAS.
      </Text>

      <View style={styles.firma}>
        <Text>Firma y aclaración del titular del contrato</Text>
        <Text style={{ fontSize: 8, marginTop: 5 }}>
          (Devolver firmado junto a la documentación)
        </Text>
      </View>

      <Text style={styles.warning}>
        Si las garantías solicitas se encuentran incompletas, el contrato no
        pasará a fábrica. No nos comprometa.
      </Text>

      <Text style={styles.footer}>Administración Viviendas Tecnohouse.</Text>
    </Page>
  </Document>
);

export default RequisitosPDF;
