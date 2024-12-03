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
    padding: 35,
    fontSize: 10,
    fontFamily: "Poppins",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    borderBottom: 1,
    borderColor: "#333",
    paddingBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    minWidth: 120,
    maxWidth: 120,
    fontSize: 9,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    fontSize: 9,
    borderBottom: 0.5,
    borderColor: "#999",
    paddingBottom: 2,
    marginLeft: 5,
  },
  gridContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
  },
  gridItemSmall: {
    flex: 0.5,
  },
  firmaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 50,
  },
  firma: {
    width: 150,
    borderTopWidth: 0.5,
    borderColor: "#333",
    paddingTop: 3,
  },
  firmaText: {
    fontSize: 8,
    textAlign: "center",
  },
  dots: {
    color: "#999",
  },
});

const AdquirientePDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>TECNO OPERACIONES</Text>

      <Text style={styles.title}>ADQUIRIENTE</Text>

      {/* Sección 1: Datos Personales */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre y Apellido:</Text>
          <Text style={styles.value}></Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>D.N.I.:</Text>
            <Text style={styles.value}></Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItemSmall]}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Estado Civil:</Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Exp.por:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Nación:</Text>
            <Text style={styles.value}></Text>
          </View>
        </View>
      </View>

      {/* Sección 2: Domicilio */}
      <View style={styles.section}>
        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Domicilio Particular:</Text>
            <Text style={styles.value}>{cliente?.address?.street || ""}</Text>
          </View>
          <View style={[styles.row, styles.gridItemSmall]}>
            <Text style={styles.label}>Nº:</Text>
            <Text style={styles.value}>{cliente?.address?.number || ""}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Entre Calles:</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>De:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Piso:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Dpto:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tel.:</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Loc.:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Desde el:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Puesto que ocupa:</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItemSmall]}>
            <Text style={styles.label}>Div.:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItemSmall]}>
            <Text style={styles.label}>Sec.:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItemSmall]}>
            <Text style={styles.label}>Dpto:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Nº Legajo:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>
      </View>

      {/* Continúa en la siguiente página */}
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Sección 4: Datos Económicos */}
      <View style={styles.section}>
        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Remuneración Total:</Text>
            <Text style={styles.value}>
              {cliente?.salary ? `$${cliente.salary}` : ""}
            </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Percibo Neto:</Text>
            <Text style={styles.value}>
              {cliente?.netSalary ? `$${cliente.netSalary}` : ""}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Caja a la que aporta:</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Otros ingresos:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>¿Son Permanentes?:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cargas familiares:</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            ¿Contribuye otra persona al mantenimiento del hogar?:
          </Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Lugar de Trabajo:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>¿Cuanto aporta?:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>¿Comerciante o profesional?:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>¿Existe contrato social?:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Intervino:</Text>
            <Text style={styles.value}> </Text>
          </View>
          <View style={[styles.row, styles.gridItem]}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}> </Text>
          </View>
        </View>

        <View style={styles.firmaContainer}>
          <View style={styles.firma}>
            <Text style={styles.firmaText}>FIRMA</Text>
          </View>
          <View style={styles.firma}>
            <Text style={styles.firmaText}>ACLARACIÓN</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default AdquirientePDF;
