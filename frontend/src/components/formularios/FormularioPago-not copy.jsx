import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useClientes } from "../../context/ClientesContext";
import styled from "styled-components";
import toast from "react-hot-toast";

const FormularioPago = ({ clienteId, factura, onClose }) => {
  const { createPago, METODOS_PAGO } = useClientes();
  const [procesando, setProcesando] = useState(false);
  const [interes, setInteres] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "EFECTIVO",
      amount: factura ? factura.total : 0,
      reference: "",
      observation: "",
      dueDate: factura ? factura.dueDate : "",
    },
  });

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Procesando pago...");
    try {
      setProcesando(true);
      const totalAmount = parseFloat(data.amount) + parseFloat(interes);
      const pagoData = {
        ...data,
        invoices: [
          {
            invoice: factura._id,
            amount: totalAmount,
          },
        ],
        interest: parseFloat(interes),
      };

      console.log("Monto total enviado:", totalAmount);

      const response = await createPago(clienteId, pagoData);
      if (response.ok) {
        toast.success("Pago registrado exitosamente");
        onClose();
      } else {
        toast.error("Error al registrar el pago: " + response.data.message);
      }
    } catch (error) {
      console.error("Error al crear pago:", error);
      toast.error("Error al registrar el pago: " + error.response.data.message);
    } finally {
      setProcesando(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        {/* Datos básicos */}
        <FormSection>
          <FormRow>
            <FormGroup>
              <Label>Fecha</Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "La fecha es requerida" }}
                render={({ field }) => (
                  <Input type="date" {...field} error={errors.date} />
                )}
              />
              {errors.date && <ErrorText>{errors.date.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Método de Pago</Label>
              <Controller
                name="paymentMethod"
                control={control}
                rules={{ required: "El método de pago es requerido" }}
                render={({ field }) => (
                  <Select {...field} error={errors.paymentMethod}>
                    {METODOS_PAGO.map((metodo) => (
                      <option key={metodo.value} value={metodo.value}>
                        {metodo.label}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.paymentMethod && (
                <ErrorText>{errors.paymentMethod.message}</ErrorText>
              )}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Referencia</Label>
            <Controller
              name="reference"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Número de transferencia, cheque, etc."
                  {...field}
                />
              )}
            />
          </FormGroup>
        </FormSection>

        {/* Factura seleccionada */}
        <FormSection>
          <SectionTitle>Factura a Pagar</SectionTitle>
          <FacturaRow>
            <FacturaInfo>
              <div>Factura #{factura.invoiceNumber}</div>
              <div>Total: ${factura.total.toLocaleString()}</div>
              <div>
                Vencimiento: {new Date(factura.dueDate).toLocaleDateString()}
              </div>
            </FacturaInfo>
            <FormGroup>
              <Label>Monto a Pagar</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max={factura.total}
                    {...field}
                    readOnly // Hacer el campo de monto solo lectura
                  />
                )}
              />
            </FormGroup>
          </FacturaRow>
        </FormSection>

        {/* Interés */}
        <FormSection>
          <FormGroup>
            <Label>Interés (si la factura ha vencido)</Label>
            <Input
              type="number"
              value={interes}
              onChange={(e) => setInteres(e.target.value)}
              placeholder="Ingrese el interés"
            />
          </FormGroup>
        </FormSection>

        {/* Monto de la cuota con interés */}
        <FormSection>
          <FormGroup>
            <Label>Monto Total a Pagar (incluyendo interés)</Label>
            <Input
              type="text"
              value={(parseFloat(factura.total) + parseFloat(interes)).toFixed(
                2
              )}
              readOnly
            />
          </FormGroup>
        </FormSection>

        {/* Observaciones */}
        <FormSection>
          <FormGroup>
            <Label>Observaciones</Label>
            <Controller
              name="observation"
              control={control}
              render={({ field }) => <TextArea {...field} rows={3} />}
            />
          </FormGroup>
        </FormSection>
      </FormGrid>

      <ButtonContainer>
        <CancelButton type="button" onClick={onClose}>
          Cancelar
        </CancelButton>
        <SubmitButton type="submit" disabled={procesando}>
          {procesando ? "Procesando..." : "Registrar Pago"}
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

// Estilos
const FormContainer = styled.form`
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
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
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#EF4444" : "#D1D5DB")};
  border-radius: 4px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#EF4444" : "#D1D5DB")};
  border-radius: 4px;
  background-color: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#EF4444" : "#D1D5DB")};
  border-radius: 4px;
  min-height: 80px;
  font-size: 0.875rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
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

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
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

export default FormularioPago;
