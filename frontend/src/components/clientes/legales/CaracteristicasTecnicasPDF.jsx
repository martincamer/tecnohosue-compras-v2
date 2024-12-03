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
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 4,
  },
  paragraph: {
    marginBottom: 6,
    textAlign: "justify",
    fontSize: 8,
    paddingLeft: 10,
  },
  bulletPoint: {
    flexDirection: "column",
    marginBottom: 8,
  },
  bullet: {
    width: 8,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 4,
  },
  column: {
    flex: 1,
  },
});

const CaracteristicasTecnicasPDF = () => (
  <Document
    style={{
      padding: "20px",
    }}
  >
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>TECNO OPERACIONES</Text>

      <Text style={styles.title}>CARACTERÍSTICAS TÉCNICAS</Text>
      <Text style={styles.subtitle}>ANEXO I</Text>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>
              Detalles de Paredes Exteriores:
            </Text>
            <Text style={styles.paragraph}>
              Con estructura de madera nacional semidura de 1" x 2" cerrado
              interiormente con placa de durlock con membrana controladora de
              humedad e infiltraciones y colocación de aislante termico y
              acustico, y un dispositivo especial para la colocación de
              ladrillos de 0,15. Con bonificación de cuotas por mano de obra,
              áridos y provisión de ladrillos a convenir entre partes según el
              caso.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>
              Detalle de Paredes Divisorias:
            </Text>
            <Text style={styles.paragraph}>
              Revestida en placa de durlock (ambos lados). Con estructura de
              madera semidura de 1" x 2". Con protección anti-humedad en solera
              inferior de pared con pintura asfáltica y ancladas a la platea con
              tornillos Fisher. Altura de paredes 2,40 m.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>Aberturas:</Text>
            <Text style={styles.paragraph}>
              Puerta de frente aluminio blanco 0,80 x 2,00 mts. con picaportes y
              boca-llaves. Ventanas de frente aberturas de aluminio blanco
              corredizas 1.20 x 1.20 vidrio entero, con vidrio. Ventanas
              traseras de aluminio blanco corredizas 1.00 x 1.00 mts. con
              vidrio, ventiluz aluminio blanco 40 x 26 cm con vidrio en baño,
              puertas interiores placa de 0.70 x 2.00 mts. con picaportes y
              boca-llaves. Puerta de escape medio vidrio con vidrio de aluminio
              blanco con picaporte y boca-llaves. Todo linea herrero.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>
              Paneles Sanitarios para Baño:
            </Text>
            <Text style={styles.paragraph}>
              Los mismos se encuentran para agua fría y caliente, trícapa,
              termofusión con mezclador fijado a la pared con grampa omega.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>Instalación Eléctrica:</Text>
            <Text style={styles.paragraph}>
              Compuesta por caños corrugados PVC 7/8" fijados con grampas omega
              y cajas rectangulares y octogonales de PVC distribuidos y
              embutidos en todos los paneles de la vivienda como así también en
              galerías y porche. Caja disyuntora.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>Cielorrasos:</Text>
            <Text style={styles.paragraph}>
              Integrales en madera nacional de ½ ", con estructura de madera
              semidura de 1" x 2", con membrana controladora de humedad e
              infiltraciones colocada sobre el machimbre.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>Techo:</Text>
            <Text style={styles.paragraph}>
              Cabreada estructural de madera nacional semidura de 1x2" y 1x3"
              ensamblados en forma especial con parantes de refuerzo columnas en
              madera 4x4 y mojinetes se encuentran machimbrados en madera
              nacional, con clavadores de 2 x 2 para mejor anclaje de las chapas
              del techo, las cuales son acanaladas marca Cincalum (zinc y
              aluminio) con cumbreras metálicas y colocación de burlete
              compriband acanalado (junta selladora de polietileno).
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.sectionTitle}>Baño:</Text>
            <Text style={styles.paragraph}>
              Revestido interiormente con placas de yeso especialmente
              impregnadas, para la mayor adherencia del revestimiento posterior
              y resistente a la humedad.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            PROMOCIONES ESPECIALES PROVISTOS SIN COLOCACIÓN:
          </Text>
          <View style={[styles.bulletPoint, { paddingLeft: 10 }]}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Juego de Baño: cinco piezas blanco: inodoro, mochila, bidet,
              pileta y pie de pileta
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CaracteristicasTecnicasPDF;
