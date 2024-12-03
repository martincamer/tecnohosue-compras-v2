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
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
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
    gap: 10,
  },
  label: {
    width: 100,
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
    marginBottom: 15,
  },
  situacionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    marginLeft: 20,
    marginBottom: 5,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkboxBox: {
    width: 12,
    height: 12,
    border: 1,
    borderColor: "#000",
    marginRight: 8,
  },
  plateaContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  plateaBox: {
    width: 400,
    height: 250,
    border: 1,
    borderColor: "#000",
    position: "relative",
  },
  plateaText: {
    position: "absolute",
    fontSize: 8,
  },
});

const BasePlateaPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>BASE DE PLATEA</Text>
      <Text style={styles.subtitle}>ANEXO IV</Text>

      <View style={styles.section}>
        <View style={styles.grid}>
          <View style={[styles.row, { flex: 1 }]}>
            <Text style={styles.label}>MODELO:</Text>
            <Text style={styles.value}>
              {cliente?.model || "........................"}
            </Text>
          </View>
          <View style={[styles.row, { flex: 1 }]}>
            <Text style={styles.label}>Ancho:</Text>
            <Text style={styles.value}>
              {cliente?.width || "........................"}
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={[styles.row, { flex: 1 }]}>
            <Text style={styles.label}>Largo:</Text>
            <Text style={styles.value}>
              {cliente?.length || "........................"}
            </Text>
          </View>
          <View style={[styles.row, { flex: 1 }]}>
            <Text style={styles.label}>Sup. Cubierta:</Text>
            <Text style={styles.value}>
              {cliente?.coveredArea || "........................"}
            </Text>
          </View>
        </View>

        <Text style={styles.situacionTitle}>
          Situación del lote/lugar donde se encuentra la platea:
        </Text>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            <View style={styles.checkboxBox} />
            <Text>a) Lote Interno</Text>
          </View>
          <View style={styles.checkbox}>
            <View style={styles.checkboxBox} />
            <Text>b) Lote Externo</Text>
          </View>
          <View style={styles.checkbox}>
            <View style={styles.checkboxBox} />
            <Text>c) Medianera</Text>
          </View>
          <View style={styles.checkbox}>
            <View style={styles.checkboxBox} />
            <Text>d) Terraza</Text>
          </View>
          <View style={styles.checkbox}>
            <View style={styles.checkboxBox} />
            <Text>e) Lote Propio</Text>
          </View>
          <View style={styles.checkbox}>
            <View style={styles.checkboxBox} />
            <Text>f) Lote de Tercero</Text>
          </View>
        </View>

        <View style={styles.plateaContainer}>
          <View style={styles.plateaBox}>
            <Text style={[styles.plateaText, { top: -15, left: "45%" }]}>
              ANCHO: {cliente?.width || "X.XX"} m
            </Text>
            <Text style={[styles.plateaText, { left: -40, top: "45%" }]}>
              LARGO: {cliente?.length || "X.XX"} m
            </Text>
            <Text style={[styles.plateaText, { top: 10, left: 10 }]}>↑N</Text>
            <Text style={[styles.plateaText, { bottom: 10, right: 10 }]}>
              Nivel: 0.15m - 0.25m
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default BasePlateaPDF;
