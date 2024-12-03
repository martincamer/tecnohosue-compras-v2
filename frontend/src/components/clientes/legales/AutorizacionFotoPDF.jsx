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
    fontSize: 11,
    fontFamily: "Poppins",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
  },
  content: {
    textAlign: "justify",
    marginBottom: 30,
  },
  firma: {
    marginTop: 40,
  },
  firmaRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  firmaLabel: {
    width: 100,
    fontWeight: "bold",
  },
  firmaLinea: {
    flex: 1,
    borderBottom: 1,
    borderColor: "#000",
  },
});

const AutorizacionFotoPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Señores</Text>
        <Text>De mi consideración</Text>
      </View>

      <View style={styles.content}>
        <Text>
          Por la presente autorizo a VIVIENDAS TECNOHOUSE DE SISTEMAS DE
          VIVIENDAS TECNOHOGAR S.R.L., a publicitar sus servicios utilizando
          fotografia, gigantografía, impresa o digital o cualquier medio gráfico
          sin limitación y / o en publicidad vía Televisión, Página Web, redes
          sociales y / o cualquier otro, de la vivienda que fue armada y
          entregada a mi parte.
        </Text>
        <Text style={{ marginTop: 20 }}>
          Dicha autorización se concede bajo la condición de preservar los datos
          personales y familiares del firmante y se concede en forma
          absolutamente gratuita e incondicional.
        </Text>
      </View>

      <Text>Atentamente,</Text>

      <View style={styles.firma}>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>FIRMA:</Text>
          <View style={styles.firmaLinea} />
        </View>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>ACLARACION:</Text>
          <View style={styles.firmaLinea} />
        </View>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>D.N.I.:</Text>
          <View style={styles.firmaLinea} />
        </View>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>
            DOMICILIO COMPLETO DE LA VIVIENDA:
          </Text>
          <View style={styles.firmaLinea} />
        </View>
      </View>
    </Page>
  </Document>
);

export default AutorizacionFotoPDF;
