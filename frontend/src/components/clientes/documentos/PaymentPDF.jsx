import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Registrar fuentes
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#112233",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112233",
  },
  infoText: {
    fontSize: 10,
    marginBottom: 3,
    color: "#444444",
    textTransform: "uppercase",
  },
  infoGroup: {
    flexDirection: "column",
    width: "48%",
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#112233",
    marginBottom: 5,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  paymentDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 10,
  },
  detailLabel: {
    fontWeight: "bold",
    width: "30%",
    textTransform: "uppercase",
  },
  detailValue: {
    width: "70%",
  },
  amount: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f9ff",
    borderRadius: 4,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0369a1",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#666",
    fontSize: 10,
    borderTop: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  observation: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
  signatureName: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 2,
    textTransform: "uppercase",
  },
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatNumber = (number) => {
  if (!number) return "0";
  return number.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const PaymentPDF = ({ pago, cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>RECIBO DE PAGO</Text>
          <Text style={styles.infoText}>#{pago.paymentNumber}</Text>
          <Text style={styles.infoText}>ref {pago._id}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.infoText}>Fecha: {formatDate(pago.date)}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Empresa Info */}
        <View style={styles.infoGroup}>
          <Text style={styles.infoTitle}>EMPRESA</Text>
          <Text style={styles.infoText}>TECNO OPERACIONES.</Text>
          {/* <Text style={styles.infoText}>Dirección de la Empresa</Text>
          <Text style={styles.infoText}>Ciudad, País</Text>
          <Text style={styles.infoText}>Tel: +XX XXX XXXXXX</Text> */}
        </View>

        {/* Cliente Info */}
        <View style={styles.infoGroup}>
          <Text style={styles.infoTitle}>CLIENTE</Text>
          <Text style={styles.infoText}>
            {cliente?.fantasyName} ({cliente?.contractNumber})
          </Text>
          {/* <Text style={styles.infoText}>CUIT: {cliente?.taxId}</Text>
          <Text style={styles.infoText}>
            {cliente?.address?.street}, {cliente?.address?.city}
          </Text> */}
        </View>
      </View>

      {/* Detalles del Pago */}
      <View style={styles.paymentDetails}>
        <Text style={styles.infoTitle}>DETALLES DEL PAGO</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Método de Pago:</Text>
          <Text style={styles.detailValue}>{pago.paymentMethod}</Text>
        </View>
        {pago.reference && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Referencia:</Text>
            <Text style={styles.detailValue}>{pago.reference}</Text>
          </View>
        )}
      </View>

      {/* Monto */}
      <View style={styles.amount}>
        <Text style={styles.amountText}>${formatNumber(pago.amount)}</Text>
      </View>

      {/* Observaciones */}
      {pago.observation && (
        <View style={styles.observation}>
          <Text style={styles.infoTitle}>OBSERVACIONES</Text>
          <Text style={styles.infoText}>{pago.observation}</Text>
        </View>
      )}

      {/* Sección de Firmas */}
      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>FIRMA CLIENTE</Text>
          <Text style={styles.signatureName}>
            {cliente?.fantasyName} ({cliente?.contractNumber})
          </Text>
          <Text style={styles.signatureText}>
            DNI/CUIT: {cliente?.documentNumber}
          </Text>
        </View>

        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>FIRMA EMPRESA</Text>
          <Text style={styles.signatureName}>TECNO OPERACIONES.</Text>
          <Text style={styles.signatureText}>AUTORIZADO</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Gracias por su pago - Este documento es un comprobante válido de pago
      </Text>
    </Page>
  </Document>
);

export default PaymentPDF;
