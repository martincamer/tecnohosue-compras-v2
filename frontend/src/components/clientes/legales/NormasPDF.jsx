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
    padding: 30,
    fontSize: 8,
    fontFamily: "Poppins",
    lineHeight: 1.3,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    borderBottom: 0.5,
    borderColor: "#333",
    paddingBottom: 3,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  datosContainer: {
    marginBottom: 15,
  },
  datoRow: {
    flexDirection: "row",
    marginBottom: 6,
    gap: 4,
  },
  label: {
    fontSize: 8,
    fontWeight: "bold",
  },
  dots: {
    flex: 1,
    borderBottom: 0.5,
    borderColor: "#999",
    marginBottom: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 8,
    textAlign: "justify",
    paddingLeft: 10,
  },
  firmaContainer: {
    marginTop: 30,
    flexDirection: "column",
    gap: 15,
  },
  firmaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  firmaBox: {
    flex: 1,
  },
  firmaLine: {
    borderTop: 0.5,
    borderColor: "#333",
    marginBottom: 4,
  },
  firmaText: {
    fontSize: 7,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    fontSize: 8,
    textAlign: "justify",
  },
});

const NormasPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>NORMAS PARA LA CONSTRUCCION DE PLATEA</Text>
      <Text style={styles.subtitle}>ANEXO IV</Text>

      <View style={styles.datosContainer}>
        <View style={styles.datoRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.dots}>{new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.datoRow}>
          <Text style={styles.label}>Nombre y Apellido:</Text>
          <Text style={styles.dots}>{cliente?.fantasyName}</Text>
        </View>
        <View style={styles.datoRow}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.dots}>{cliente?.address?.street}</Text>
          <Text style={styles.label}>Tel.:</Text>
          <Text style={styles.dots}>{cliente?.phone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. PLATEA</Text>
        <Text style={styles.sectionContent}>
          Deberá realizarse a un nivel superior al de la vereda, con una medida
          de un metro más largo y un metro más ancho que el modelo de la
          vivienda adquirida. Su espesor deberá ser de 0.15 a 0.25 mts. de alto
          como mínimo y deberá encontrarse en PERFECTA ESCUADRA Y NIVEL. Sin
          cañerias ni desagües.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. LA PROPORCION</Text>
        <Text style={styles.sectionContent}>
          Partes: nueve (9) partes de granza fina, dos (2) de plasticor, una (1)
          parte de arena y media parte (1/2) de cemento portland.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. ACCESO</Text>
        <Text style={styles.sectionContent}>
          El acceso al lote deberá estar libre de malezas y otros objetos que
          obstaculizen el libre tránsito de mercadería, material y personal de
          ensamble.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. INCUMPLIMIENTO</Text>
        <Text style={styles.sectionContent}>
          El incumplimiento de dichas normas, y la sola constatación por
          personal de VIVIENDAS TECNOHOUSE DE SISTEMA DE VIVIENDAS TECNOHOGAR
          S.R.L. hace posible el retorno a fábrica de todos los materiales
          debiendo efectuarse en ese mismo instante un nuevo acuerdo de entrega
          responsabilizándose el COMITENTE por la integridad de dichos
          materiales, abonando nuevamente los gastos que todo ellos genere.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          En prueba de conformidad se firman dos ejemplares de un mismo tenor y
          a un solo efecto en la ciudad de
          .................................................. a los
          ............... días de .............................. de
          20...........
        </Text>
      </View>

      <View style={styles.firmaContainer}>
        <View style={styles.firmaRow}>
          <View style={styles.firmaBox}>
            <View style={styles.firmaLine} />
            <Text style={styles.firmaText}>FIRMA</Text>
          </View>
          <View style={styles.firmaBox}>
            <View style={styles.firmaLine} />
            <Text style={styles.firmaText}>ACLARACIÓN</Text>
          </View>
          <View style={styles.firmaBox}>
            <View style={styles.firmaLine} />
            <Text style={styles.firmaText}>DNI</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default NormasPDF;
