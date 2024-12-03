import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCompras } from "../../../context/ComprasContext";
import styled from "styled-components";
import toast from "react-hot-toast";
import { formatearDinero } from "../../../utils/formatearDinero";

// Styled Components
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    ring: 1px #3b82f6;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    ring: 1px #3b82f6;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 5rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    ring: 1px #3b82f6;
  }
`;

const ErrorText = styled.span`
  color: #dc2626;
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #f3f4f6;
  color: #374151;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

const FacturasGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const FacturaRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FacturaInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const TotalLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const TotalValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const FormularioPagoProveedor = ({ providerId, onClose, facturas }) => {
  const { createPagoProveedor, METODOS_PAGO } = useCompras();
  const [procesando, setProcesando] = useState(false);
  const [comprasSeleccionadas, setComprasSeleccionadas] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  console.log("facturas", facturas);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "EFECTIVO",
      reference: "",
      observation: "",
    },
  });

  const handleCompraSelect = (compra, monto) => {
    console.log("Seleccionando compra:", { compra, monto }); // Debug log

    const montoNumerico = parseFloat(monto);

    setComprasSeleccionadas((prevCompras) => {
      const nuevasCompras = prevCompras.filter((c) => c._id !== compra._id);
      if (montoNumerico > 0) {
        nuevasCompras.push({
          _id: compra._id,
          amount: montoNumerico,
        });
      }

      // Calcular nuevo total
      const nuevoTotal = nuevasCompras.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      setMontoTotal(nuevoTotal);

      return nuevasCompras;
    });
  };

  const handleCheckboxChange = (compra) => {
    setSelectedCheckboxes((prev) => {
      const isSelected = !prev[compra._id];
      const newState = { ...prev, [compra._id]: isSelected };

      // Actualizar el input y el monto
      const input = document.getElementById(`input-${compra._id}`);
      if (input) {
        input.value = isSelected ? compra.total : 0;
      }

      // Actualizar compras seleccionadas y monto total
      const nuevasCompras = comprasSeleccionadas.filter(
        (c) => c._id !== compra._id
      );
      if (isSelected) {
        nuevasCompras.push({
          _id: compra._id,
          amount: compra.total,
        });
      }
      setComprasSeleccionadas(nuevasCompras);

      // Calcular nuevo total
      const nuevoTotal = nuevasCompras.reduce(
        (acc, curr) => acc + parseFloat(curr.amount),
        0
      );
      setMontoTotal(nuevoTotal);

      return newState;
    });
  };

  const onSubmit = async (data) => {
    if (!providerId) {
      toast.error("ID del proveedor no encontrado");
      return;
    }

    if (comprasSeleccionadas.length === 0) {
      toast.error("Debe seleccionar al menos una factura");
      return;
    }

    setProcesando(true);
    try {
      // Validar que el monto total sea correcto
      const totalCalculado = comprasSeleccionadas.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      if (totalCalculado !== montoTotal) {
        toast.error("Error en el cálculo del monto total");
        return;
      }

      const pagoData = {
        // date: data.date,
        // paymentMethod: data.paymentMethod,
        // reference: data.reference || "",
        // observation: data.observation || "",
        amount: totalCalculado,
        invoices: comprasSeleccionadas.map((factura) => ({
          _id: factura._id,
          amount: parseFloat(factura.amount),
        })),
      };

      console.log("Datos del pago a enviar:", pagoData); // Para debug

      const result = await createPagoProveedor(providerId, pagoData);

      if (result.success) {
        toast.success("Pago registrado exitosamente");
        onClose();
      }
    } catch (error) {
      console.error("Error al registrar pago:", error);
      const errorMessage =
        error.response?.data?.message || "Error al registrar el pago";
      toast.error(errorMessage);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormField>
          <Label>Fecha</Label>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => <Input type="date" {...field} />}
          />
          {errors.date && <ErrorText>{errors.date.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>Método de Pago</Label>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select {...field}>
                {METODOS_PAGO.map((metodo) => (
                  <option key={metodo.value} value={metodo.value}>
                    {metodo.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormField>
      </FormGrid>

      <SectionTitle>Facturas Pendientes</SectionTitle>
      <FacturasGrid className="space-y-4">
        {facturas
          ?.filter((factura) => factura.paymentStatus !== "PAGADO")
          .map((compra) => (
            <div
              key={compra._id}
              className="bg-white border border-gray-200 p-4 hover:border-blue-400 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Checkbox Section */}
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedCheckboxes[compra._id] || false}
                    className="w-4 h-4 rounded border-gray-100  text-blue-600 focus:ring-blue-500 cursor-pointer"
                    onChange={() => handleCheckboxChange(compra)}
                  />
                </div>

                {/* Factura Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Factura #{compra.invoiceNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Fecha: {new Date(compra.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Total: {formatearDinero(compra.total)}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        Pendiente: {formatearDinero(compra.total)}
                      </p>
                    </div>
                  </div>

                  {/* Payment Input */}
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium">
                        $
                      </span>
                      <input
                        id={`input-${compra._id}`}
                        type="text"
                        max={compra.balance}
                        min="0"
                        step="0.01"
                        defaultValue="0"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                        onChange={(e) => {
                          const valor = parseFloat(e.target.value) || 0;
                          handleCompraSelect(compra, valor);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </FacturasGrid>

      {/* Total Section */}
      <div className="mt-6 bg-gray-50 p-4 border">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">
            Total a Pagar
          </span>
          <span className="text-2xl font-medium text-blue-600">
            {formatearDinero(montoTotal)}
          </span>
        </div>
      </div>

      <ButtonContainer>
        <CancelButton type="button" onClick={onClose}>
          Cancelar
        </CancelButton>
        <SubmitButton type="submit" disabled={procesando || montoTotal <= 0}>
          {procesando ? "Procesando..." : "Registrar Pago"}
        </SubmitButton>
      </ButtonContainer>
    </form>
  );
};

export default FormularioPagoProveedor;
