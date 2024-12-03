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
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  dottedLine: {
    borderBottom: 1,
    borderStyle: "dotted",
    marginBottom: 20,
  },
  totalSection: {
    marginTop: 40,
  },
  totalTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
  },
  firmasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
    paddingHorizontal: 40,
  },
  firma: {
    width: 150,
    textAlign: "center",
  },
  firmaLinea: {
    borderTop: 1,
    marginBottom: 5,
  },
  firmaTexto: {
    fontSize: 10,
  },
});

const AnexoDosPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>ANEXO II</Text>

      {[...Array(20)].map((_, index) => (
        <View key={index} style={styles.dottedLine} />
      ))}

      <View style={styles.totalSection}>
        <Text style={styles.totalTitle}>
          TOTAL ADICIONAL CONTADO / EFECTIVO
        </Text>
        {[...Array(6)].map((_, index) => (
          <View key={`total-${index}`} style={styles.dottedLine} />
        ))}
      </View>

      <View style={styles.firmasContainer}>
        <View style={styles.firma}>
          <View style={styles.firmaLinea} />
          <Text style={styles.firmaTexto}>FIRMA CLIENTE</Text>
        </View>
        <View style={styles.firma}>
          <View style={styles.firmaLinea} />
          <Text style={styles.firmaTexto}>FIRMA JEFE DE FABRICA</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default AnexoDosPDF;
