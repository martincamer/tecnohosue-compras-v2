import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useClientes } from "../../../context/ClientesContext";
import styled from "styled-components";
import toast from "react-hot-toast";

const FormularioEditarFactura = ({ clienteId, factura, onClose }) => {
  const { updateFactura, TIPOS_FACTURA } = useClientes();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      invoiceType: factura.invoiceType,
      total: factura.total,
      interest: 0,
      observation: factura.observation,
    },
  });

  const total = watch("total");
  const interest = watch("interest");
  const newTotal = parseFloat(total) + (parseFloat(interest) || 0);

  const onSubmit = async (data) => {
    try {
      const response = await updateFactura(clienteId, factura._id, {
        ...data,
        total: newTotal,
        interest: interest,
      });
      if (response.success) {
        toast.success("Factura actualizada exitosamente");
        onClose();
      } else {
        toast.error("Error al actualizar la factura: " + response.message);
      }
    } catch (error) {
      toast.error("Error al actualizar la factura");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Tipo de Factura</Label>
        <Controller
          name="invoiceType"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              {TIPOS_FACTURA.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.invoiceType && (
          <ErrorText>{errors.invoiceType.message}</ErrorText>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Total Original</Label>
        <Controller
          name="total"
          control={control}
          render={({ field }) => <Input type="number" {...field} readOnly />}
        />
      </FormGroup>

      <FormGroup>
        <Label>Interés por Falta de Pago</Label>
        <Controller
          name="interest"
          control={control}
          render={({ field }) => (
            <Input type="number" {...field} placeholder="Ingrese el interés" />
          )}
        />
        {errors.interest && <ErrorText>{errors.interest.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Total con Interés</Label>
        <Input type="number" value={newTotal} readOnly />
      </FormGroup>

      <FormGroup>
        <Label>Observaciones</Label>
        <Controller
          name="observation"
          control={control}
          render={({ field }) => <TextArea {...field} readOnly />}
        />
      </FormGroup>

      <ButtonContainer>
        <CancelButton type="button" onClick={onClose}>
          Cancelar
        </CancelButton>
        <SubmitButton type="submit">Actualizar Factura</SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

// Estilos
const FormContainer = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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

export default FormularioEditarFactura;
