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
    marginBottom: 20,
    textAlign: "center",
  },
  instruction: {
    fontSize: 10,
    marginBottom: 20,
    fontStyle: "italic",
  },
  optionContainer: {
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    marginBottom: 8,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: 1,
    borderColor: "#000",
    marginRight: 8,
  },
  optionText: {
    flex: 1,
  },
  line: {
    borderBottom: 1,
    borderColor: "#666",
    flex: 1,
    marginLeft: 5,
  },
  firma: {
    marginTop: 30,
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
  thanks: {
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
});

const PublicidadPDF = ({ cliente }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>SU OPINIÓN NOS INTERESA</Text>
      <Text style={styles.subtitle}>¿Cómo nos conoció?</Text>
      <Text style={styles.instruction}>
        Por favor marque y/o complete lo que corresponda.
      </Text>

      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>
            Publicidad Televisa (Programación / Canal):
          </Text>
          <View style={styles.line} />
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>
            Publicidad Gráfica (Diario / Periódico / Revista):
          </Text>
          <View style={styles.line} />
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>
            Publicidad Radial (Radio / Programa):
          </Text>
          <View style={styles.line} />
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text>Página Web</Text>
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text>Publicidad en Facebook</Text>
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text>Publicidad en Twitter</Text>
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text>Buscadores WEB (Google/Bing/Yahoo,etc.)</Text>
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>
            Promociones en Ferias, Eventos, etc. (por favor especificar el
            lugar)
          </Text>
          <View style={styles.line} />
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>Me lo recomendó un conocido</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.option}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>Otro</Text>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.firma}>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>FIRMA:</Text>
          <View style={styles.firmaLinea} />
        </View>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>ACLARACIÓN:</Text>
          <View style={styles.firmaLinea} />
        </View>
        <View style={styles.firmaRow}>
          <Text style={styles.firmaLabel}>E-MAIL:</Text>
          <View style={styles.firmaLinea} />
        </View>
      </View>

      <Text style={styles.thanks}>¡Gracias por elegirnos!</Text>
    </Page>
  </Document>
);

export default PublicidadPDF;
