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
    fontSize: 9,
    padding: 20,
    backgroundColor: "#ffffff",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#0369a1",
    textTransform: "uppercase",
  },
  infoText: {
    fontSize: 9,
    marginBottom: 2,
    color: "#444444",
    textTransform: "uppercase",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    gap: 20,
    fontSize: 9,
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
  amountIngreso: {
    color: "green", // Color para ingresos
  },
  amountEgreso: {
    color: "red", // Color para egresos
  },
  amountTransferencia: {
    color: "blue", // Color para transferencias
  },
  amount: {
    marginTop: 15,
    padding: 5,
    // backgroundColor: "#f0f9ff",
    // borderRadius: 4,
    border: "1px solid #e5e7eb",
  },
  amountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0369a1",
    textAlign: "center",
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
  table: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomColor: "#0369a1",
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#f3f4f6",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  columnHeader: {
    color: "#0369a1",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  columnDescripcion: {
    width: "30%",
    paddingHorizontal: 5,
  },
  columnMonto: {
    width: "15%",
    paddingHorizontal: 5,
    textAlign: "right",
  },
  columnTipo: {
    width: "15%",
    paddingHorizontal: 5,
  },
  columnCategoria: {
    width: "20%",
    paddingHorizontal: 5,
  },
  columnBalance: {
    width: "20%",
    paddingHorizontal: 5,
    textAlign: "right",
  },
});

const CajaMovimientoPDF = ({
  movimientos,
  fechaInicio,
  fechaFin,
  observacion,
  balanceFinal,
  sucursal,
}) => {
  let balanceAcumulado = 0;

  console.log(movimientos);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Movimientos de la caja, {sucursal}</Text>
          <Text style={styles.infoText}>
            Fecha: {new Date().toLocaleDateString("es-AR")}
          </Text>
        </View>

        <Text style={styles.infoText}>
          Desde: {fechaInicio} Hasta: {fechaFin}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.columnDescripcion]}>
              Descripción
            </Text>
            <Text style={[styles.columnHeader, styles.columnMonto]}>Monto</Text>
            <Text style={[styles.columnHeader, styles.columnTipo]}>Tipo</Text>
            <Text style={[styles.columnHeader, styles.columnCategoria]}>
              Categoría
            </Text>
            <Text style={[styles.columnHeader, styles.columnBalance]}>
              Balance
            </Text>
          </View>

          {movimientos?.map((movimiento, index) => {
            const amount =
              movimiento.tipo === "EGRESO" ||
              movimiento.tipo === "TRANSFERENCIA"
                ? -movimiento.monto
                : movimiento.monto;
            balanceAcumulado += amount;

            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.columnDescripcion}>
                  {movimiento?.descripcion}
                </Text>
                <Text
                  style={[
                    styles.columnMonto,
                    { color: movimiento.tipo === "INGRESO" ? "green" : "red" },
                  ]}
                >
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(movimiento?.monto)}
                </Text>
                <Text style={styles.columnTipo}>{movimiento?.tipo}</Text>
                <Text style={styles.columnCategoria}>
                  {movimiento?.categoria || "-"}
                </Text>
                <Text
                  style={[
                    styles.columnBalance,
                    { color: balanceAcumulado < 0 ? "#DC2626" : "#000" },
                  ]}
                >
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(balanceAcumulado)}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.amount}>
          <Text style={styles.amountText}>Balance Final</Text>
          <Text
            style={[
              styles.amountText,
              { color: balanceFinal < 0 ? "#DC2626" : "#000" },
            ]}
          >
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(balanceFinal)}
          </Text>
        </View>

        <Text style={styles.footer}>
          Gracias por su atención - Este documento es un comprobante válido de
          movimiento de caja
        </Text>
      </Page>
    </Document>
  );
};

export default CajaMovimientoPDF;
