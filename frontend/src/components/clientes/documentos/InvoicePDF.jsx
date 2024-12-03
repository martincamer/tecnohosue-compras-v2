import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatearDinero } from "../../../utils/formatearDinero";

// Registrar fuentes (opcional)
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
  logo: {
    width: 150,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112233",
    flexDirection: "row",
    gap: 8,
  },
  invoiceType: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112233",
    marginLeft: 8,
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
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
  infoText: {
    fontSize: 10,
    marginBottom: 3,
    color: "#444444",
    textTransform: "uppercase",
  },
  table: {
    flexDirection: "column",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 8,
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 8,
    fontSize: 10,
    textTransform: "uppercase",
  },
  description: { width: "40%", textTransform: "uppercase" },
  quantity: { width: "15%" },
  price: { width: "15%" },
  discount: { width: "15%" },
  subtotal: { width: "15%", textAlign: "right" },
  totals: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalLabel: {
    width: 100,
    textAlign: "right",
    paddingRight: 10,
    fontWeight: "bold",
  },
  totalValue: {
    width: 100,
    textAlign: "right",
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
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const InvoicePDF = ({ factura, cliente, productos }) => {
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    const productMap = {};
    factura?.items.forEach((item) => {
      const product = productos.find(
        (p) => p._id.toString() === item.product.toString()
      );
      if (product) {
        productMap[item.product] = product.name;
      }
    });
    setProductNames(productMap);
  }, [factura.items, productos]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              FACTURA {factura.invoiceType || "-"}
            </Text>
            <Text style={styles.infoText}>#{factura.invoiceNumber}</Text>
            <Text style={styles.infoText}>ref {factura._id}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.infoText}>
              Fecha: {formatDate(factura.date)}
            </Text>
            <Text style={styles.infoText}>
              Vencimiento: {formatDate(factura.dueDate)}
            </Text>
          </View>
        </View>

        {/* Info Sections */}
        <View style={styles.invoiceInfo}>
          <View style={styles.infoGroup}>
            <Text style={styles.infoTitle}>EMPRESA</Text>
            <Text style={styles.infoText}>TECNO OPERACIONES.</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoTitle}>CLIENTE</Text>
            <Text style={styles.infoText}>
              {cliente?.fantasyName} ({cliente?.contractNumber})
            </Text>
            <Text style={styles.infoText}>{cliente?.contact?.email}</Text>
            <Text style={styles.infoText}>{cliente?.contact?.phone}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Descripción</Text>
            <Text style={styles.quantity}>Cantidad</Text>
            <Text style={styles.price}>Precio</Text>
            <Text style={styles.discount}>Descuento</Text>
            <Text style={styles.subtotal}>Subtotal</Text>
          </View>

          {factura.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.description}>
                {productNames[item.product] || item.product}
                {/* {item.description} */}
              </Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.price}>
                {formatearDinero(item.unitPrice)}
              </Text>
              <Text style={styles.discount}>{item.discount || 0}%</Text>
              <Text style={styles.subtotal}>
                {formatearDinero(factura.total - factura.interest)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SUBTOTAL</Text>
            <Text style={styles.totalValue}>
              {formatearDinero(factura.total - factura.interest)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>INTERES</Text>
            <Text style={styles.totalValue}>
              + {formatearDinero(factura.interest)}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>
              {formatearDinero(factura.total)}
            </Text>
          </View>
        </View>

        {/* Observations */}
        {factura.observation && (
          <View style={{ marginTop: 30 }}>
            <Text style={styles.infoTitle}>OBSERVACIONES</Text>
            <Text
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                marginBottom: 3,
                color: "#444444",
              }}
            >
              {factura.observation}
            </Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>Gracias por su preferencia</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
