import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import clienteAxios from "../config/clienteAxios";
import getConfig from "../helpers/configHeader";

const CajaBancoContext = createContext();

export const CajaBancoProvider = ({ children }) => {
  const [caja, setCaja] = useState(null);
  const [banco, setBanco] = useState(null);
  const [alerta, setAlerta] = useState({});
  const [loading, setLoading] = useState(true);
  const [cajas, setCajas] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  // Obtener datos iniciales
  const obtenerDatos = async () => {
    try {
      const config = getConfig();
      if (!config) return;

      const cajaRes = await clienteAxios("/cash", config);

      setCaja(cajaRes.data);

      setLoading(false);
    } catch (error) {
      console.error("Error completo:", error);
      setAlerta({
        msg:
          error.response?.data?.message ||
          "Error al cargar los datos financieros",
        error: true,
      });
      setLoading(false);
    }
  };

  // Obtener datos iniciales
  const obtenerAllCajas = async () => {
    try {
      const config = getConfig();
      if (!config) return;

      const response = await clienteAxios.get("/cash/all-cash", config);
      setCajas(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: "Error al cargar los datos financieros",
        error: true,
      });
      setLoading(false);
    }
  };

  // Operaciones de Caja
  const crearTransaccionCaja = async (transaccion) => {
    const loadingToast = toast.loading("Procesando transacción...");
    try {
      const config = getConfig();
      if (!config) {
        toast.error("Error de autenticación");
        return { success: false, error: "No autorizado" };
      }

      const { data } = await clienteAxios.post(
        "/cash/transaction",
        transaccion,
        config
      );

      if (data.ok) {
        setCaja(data.cash);
        console.log("asdassddasdsad", data.cash);
        toast.success("Transacción realizada exitosamente");
        return { success: true, data: data.cash };
      } else {
        throw new Error(data.message || "Error al procesar la transacción");
      }
    } catch (error) {
      console.error("Error en crearTransaccionCaja:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al procesar la transacción";
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
        details: error.response?.data?.details,
      };
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // Operaciones de Banco
  const crearTransaccionBanco = async (transaccion) => {
    try {
      const config = getConfig();
      if (!config) return;

      const { data } = await clienteAxios.post(
        "/bank/transaction",
        transaccion,
        config
      );

      setBanco(data.bank);
      toast.success("Transacción bancaria realizada exitosamente");
      return { success: true, data: data.bank };
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Error al procesar la transacción bancaria"
      );
      return { success: false, error };
    }
  };

  // Transferencias entre Caja y Banco
  const realizarTransferencia = async (transferencia) => {
    try {
      const config = getConfig();
      if (!config) return;

      const { data } = await clienteAxios.post(
        "/cash/transfer",
        transferencia,
        config
      );

      setCaja(data.cash);
      setBanco(data.bank);
      toast.success("Transferencia realizada exitosamente");
      return { success: true, data };
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error al realizar la transferencia"
      );
      return { success: false, error };
    }
  };

  // Pago a Proveedores
  const pagarProveedor = async (pago) => {
    try {
      const config = getConfig();
      if (!config) return;

      const { data } = await clienteAxios.post(
        `/suppliers/${pago.supplierId}/payments`,
        pago,
        config
      );

      if (pago.source === "CAJA") {
        setCaja(data.cash);
      } else {
        setBanco(data.bank);
      }

      toast.success("Pago realizado exitosamente");
      return { success: true, data };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error al procesar el pago");
      return { success: false, error };
    }
  };

  // Cobro de Facturas
  const registrarCobro = async (cobro) => {
    try {
      const config = getConfig();
      if (!config) return;

      const { data } = await clienteAxios.post(
        `/invoices/${cobro.invoiceId}/payments`,
        cobro,
        config
      );

      if (cobro.destination === "CAJA") {
        setCaja(data.cash);
      } else {
        setBanco(data.bank);
      }

      toast.success("Cobro registrado exitosamente");
      return { success: true, data };
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error al procesar el cobro"
      );
      return { success: false, error };
    }
  };

  const obtenerSucursales = async () => {
    try {
      const response = await clienteAxios.get("/sucursales");
      setSucursales(response.data.sucursales);
    } catch (error) {
      console.error("Error al obtener las sucursales:", error);
    }
  };

  useEffect(() => {
    obtenerDatos();
    obtenerAllCajas();
    obtenerSucursales();
  }, []);

  return (
    <CajaBancoContext.Provider
      value={{
        caja,
        setCaja,
        banco,
        loading,
        alerta,
        setAlerta,
        crearTransaccionCaja,
        crearTransaccionBanco,
        realizarTransferencia,
        pagarProveedor,
        registrarCobro,
        cajas,
        obtenerAllCajas,
        sucursales,
      }}
    >
      {children}
    </CajaBancoContext.Provider>
  );
};

export const useCajaBanco = () => {
  return useContext(CajaBancoContext);
};
