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
    fontFamily: "Poppins",
    fontSize: 10,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  tecnoOperaciones: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase", // Títulos en mayúsculas
    textAlign: "center", // Centrar el título
    marginBottom: 10, // Espacio debajo del título
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: "#0369a1",
    paddingBottom: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0369a1",
    textTransform: "uppercase",
  },
  infoText: {
    fontSize: 10,
    marginBottom: 2,
    color: "#444444",
    textTransform: "capitalize",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 10,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
  },
  detailLabel: {
    fontWeight: "bold",
    width: "50%",
    color: "#0369a1",
    textTransform: "uppercase",
  },
  detailValue: {
    width: "50%",
    color: "#111827",
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 8,
    borderTop: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 5,
  },
  signatureSection: {
    marginTop: 30,
    textAlign: "center",
  },
  signatureLine: {
    borderBottom: 1,
    width: "50%",
    margin: "0 auto",
    marginTop: 20,
  },
  signatureText: {
    marginTop: 5,
    fontSize: 10,
    color: "#444444",
  },
});

const ComprobanteMovimientoPDF = ({ movimiento, sucursal }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.tecnoOperaciones}>TECNO OPERACIONES</Text>{" "}
        {/* Título estilizado */}
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Movimiento caja, {sucursal}</Text>
        <Text style={styles.infoText}>
          Fecha: {new Date(movimiento?.date).toLocaleDateString("es-AR")}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tipo:</Text>
        <Text style={styles.detailValue}>{movimiento?.type.toUpperCase()}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Descripción:</Text>
        <Text style={styles.detailValue}>{movimiento?.description}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Categoría:</Text>
        <Text style={styles.detailValue}>{movimiento?.category}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Monto:</Text>
        <Text style={styles.detailValue}>
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(movimiento?.amount)}
        </Text>
      </View>

      <View style={styles.signatureSection}>
        <Text style={styles.signatureText}>Firma:</Text>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureText}>Nombre y Apellido</Text>
      </View>

      <Text style={styles.footer}>
        Gracias por su atención - Este documento es un comprobante válido de
        movimiento de caja
      </Text>
    </Page>
  </Document>
);

export default ComprobanteMovimientoPDF;
