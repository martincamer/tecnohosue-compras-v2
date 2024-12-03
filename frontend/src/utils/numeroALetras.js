const Unidades = (num) => {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
    default:
      return "";
  }
};

const Decenas = (num) => {
  const decena = Math.floor(num / 10);
  const unidad = num - decena * 10;

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return unidad === 0 ? "TREINTA" : "TREINTA Y " + Unidades(unidad);
    case 4:
      return unidad === 0 ? "CUARENTA" : "CUARENTA Y " + Unidades(unidad);
    case 5:
      return unidad === 0 ? "CINCUENTA" : "CINCUENTA Y " + Unidades(unidad);
    case 6:
      return unidad === 0 ? "SESENTA" : "SESENTA Y " + Unidades(unidad);
    case 7:
      return unidad === 0 ? "SETENTA" : "SETENTA Y " + Unidades(unidad);
    case 8:
      return unidad === 0 ? "OCHENTA" : "OCHENTA Y " + Unidades(unidad);
    case 9:
      return unidad === 0 ? "NOVENTA" : "NOVENTA Y " + Unidades(unidad);
    case 0:
      return Unidades(unidad);
    default:
      return "";
  }
};

const Centenas = (num) => {
  const centena = Math.floor(num / 100);
  const decena = num - centena * 100;

  switch (centena) {
    case 1:
      return decena === 0 ? "CIEN" : "CIENTO " + Decenas(decena);
    case 2:
      return decena === 0 ? "DOSCIENTOS" : "DOSCIENTOS " + Decenas(decena);
    case 3:
      return decena === 0 ? "TRESCIENTOS" : "TRESCIENTOS " + Decenas(decena);
    case 4:
      return decena === 0
        ? "CUATROCIENTOS"
        : "CUATROCIENTOS " + Decenas(decena);
    case 5:
      return decena === 0 ? "QUINIENTOS" : "QUINIENTOS " + Decenas(decena);
    case 6:
      return decena === 0 ? "SEISCIENTOS" : "SEISCIENTOS " + Decenas(decena);
    case 7:
      return decena === 0 ? "SETECIENTOS" : "SETECIENTOS " + Decenas(decena);
    case 8:
      return decena === 0 ? "OCHOCIENTOS" : "OCHOCIENTOS " + Decenas(decena);
    case 9:
      return decena === 0 ? "NOVECIENTOS" : "NOVECIENTOS " + Decenas(decena);
    default:
      return Decenas(decena);
  }
};

const Seccion = (num, divisor, strSingular, strPlural) => {
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  let letras = "";

  if (cientos > 0) {
    if (cientos > 1) {
      letras = Centenas(cientos) + " " + strPlural;
    } else {
      letras = strSingular;
    }
  }

  if (resto > 0) {
    letras += "";
  }

  return letras;
};

const Miles = (num) => {
  const divisor = 1000;
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  const strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  const strCentenas = Centenas(resto);

  if (strMiles === "") {
    return strCentenas;
  }

  return strMiles + " " + strCentenas;
};

const Millones = (num) => {
  const divisor = 1000000;
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  const strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  const strMiles = Miles(resto);

  if (strMillones === "") {
    return strMiles;
  }

  return strMillones + " " + strMiles;
};

export const numeroALetras = (num) => {
  const data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: Math.round(num * 100) - Math.floor(num) * 100,
    letrasCentavos: "",
    letrasMonedaPlural: "PESOS",
    letrasMonedaSingular: "PESO",
  };

  if (data.centavos > 0) {
    data.letrasCentavos =
      "CON " + data.centavos + "/100 " + data.letrasMonedaPlural;
  } else {
    data.letrasCentavos = "";
  }

  if (data.enteros === 0) {
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }
  if (data.enteros === 1) {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaSingular +
      " " +
      data.letrasCentavos
    );
  } else {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaPlural +
      " " +
      data.letrasCentavos
    );
  }
};
