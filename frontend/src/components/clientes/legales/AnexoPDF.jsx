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
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    width: 150,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    borderBottom: 1,
    borderColor: "#666",
  },
  grid: {
    flexDirection: "row",
    gap: 20,
  },
  firma: {
    marginTop: 50,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 10,
    width: 200,
    textAlign: "center",
  },
});

const AnexoPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>ADQUIRIENTE</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre y Apellido:</Text>
          <Text style={styles.value}>{cliente?.fantasyName}</Text>
        </View>

        <View style={styles.grid}>
          <View style={[styles.row, { flex: 1 }]}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <Text style={styles.value}>{cliente?.birthDate}</Text>
          </View>
          <View style={[styles.row, { flex: 1 }]}>
            <Text style={styles.label}>D.N.I.:</Text>
            <Text style={styles.value}>{cliente?.documentNumber}</Text>
          </View>
        </View>

        {/* Continuar con el resto de los campos... */}

        <View style={styles.firma}>
          <Text>FIRMA</Text>
          <Text>ACLARACIÓN</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default AnexoPDF;
