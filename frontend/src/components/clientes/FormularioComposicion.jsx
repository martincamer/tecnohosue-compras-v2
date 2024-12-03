import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { FileUploader } from "../common/FileUploader";
import { useClientes } from "../../context/ClientesContext";

const FormularioComposicion = ({ onClose, composicion = null }) => {
  const { createCasa } = useClientes();
  const [composiciones, setComposiciones] = useState([]);
  const [totalMetrosCuadrados, setTotalMetrosCuadrados] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      articulo: "",
      ancho: "",
      largo: "",
      observaciones: "",
    },
  });

  const ARTICULOS = [
    { value: "dormitorio", label: "Dormitorio" },
    { value: "baño", label: "Baño" },
    { value: "ante-baño", label: "Antebaño" },
    { value: "comedor", label: "Comedor" },
    { value: "galeria", label: "Galería" },
    { value: "cocina", label: "Cocina" },
    { value: "cocina-comedor", label: "Cocina-Comedor" },
    { value: "living-comedor", label: "Living-Comedor" },
    { value: "garage", label: "Garage" },
    { value: "vestidor", label: "Vestidor" },
    { value: "porch", label: "Porch" },
    { value: "pasillo", label: "Pasillo" },
    { value: "sala_estar", label: "Sala de Estar" },
    { value: "lavadero", label: "Lavadero" },
  ];

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        ancho: Number(data.ancho),
        largo: Number(data.largo),
        metrosCuadrados: Number(data.ancho) * Number(data.largo),
      };

      setComposiciones([...composiciones, formattedData]);
      const nuevoTotal = totalMetrosCuadrados + formattedData.metrosCuadrados;
      setTotalMetrosCuadrados(nuevoTotal);

      reset();
      toast.success("Artículo agregado correctamente");
    } catch (error) {
      console.error("Error en submit:", error);
      toast.error("Error al procesar el formulario");
    }
  };

  const handleRemoveComposicion = (index) => {
    const composicionEliminada = composiciones[index];
    const nuevasComposiciones = composiciones.filter((_, i) => i !== index);
    setComposiciones(nuevasComposiciones);
    setTotalMetrosCuadrados(
      totalMetrosCuadrados - composicionEliminada.metrosCuadrados
    );
    toast.success("Artículo eliminado correctamente");
  };

  const handleCreateCasa = async () => {
    if (composiciones.length === 0) {
      toast.error("Debe agregar al menos un artículo");
      return;
    }

    if (!nombre.trim()) {
      toast.error("El nombre de la casa es obligatorio");
      return;
    }

    try {
      const casaData = {
        nombre,
        composiciones,
        totalMetrosCuadrados,
        imagen,
      };

      const result = await createCasa(casaData);

      if (result.success) {
        toast.success("Casa creada correctamente");
        onClose();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error al crear casa:", error);
      toast.error(error.message || "Error al crear la casa");
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Nombre de la Casa</Label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre de la casa"
            required
          />
        </FormGroup>

        <div className="my-4">
          <FormGroup>
            <Label>Imagen de la Casa</Label>
            <FileUploader
              onFileSelect={(file) => setImagen(file)}
              currentFile={imagen}
              acceptedTypes="image"
            />
          </FormGroup>
        </div>

        <FormGrid>
          <FormGroup>
            <Label>Artículo</Label>
            <Controller
              name="articulo"
              control={control}
              rules={{ required: "El artículo es obligatorio" }}
              render={({ field }) => (
                <Select {...field} error={errors.articulo}>
                  <option value="">Seleccionar artículo</option>
                  {ARTICULOS.map((art) => (
                    <option key={art.value} value={art.value}>
                      {art.label}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.articulo && (
              <ErrorText>{errors.articulo.message}</ErrorText>
            )}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Ancho (m)</Label>
              <Controller
                name="ancho"
                control={control}
                rules={{
                  required: "El ancho es obligatorio",
                  min: { value: 0.01, message: "El ancho debe ser mayor a 0" },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    error={errors.ancho}
                    placeholder="0.00"
                  />
                )}
              />
              {errors.ancho && <ErrorText>{errors.ancho.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Largo (m)</Label>
              <Controller
                name="largo"
                control={control}
                rules={{
                  required: "El largo es obligatorio",
                  min: { value: 0.01, message: "El largo debe ser mayor a 0" },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    error={errors.largo}
                    placeholder="0.00"
                  />
                )}
              />
              {errors.largo && <ErrorText>{errors.largo.message}</ErrorText>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Observaciones</Label>
            <Controller
              name="observaciones"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows="3"
                  placeholder="Observaciones adicionales"
                />
              )}
            />
          </FormGroup>
        </FormGrid>

        <ButtonContainer>
          <SubmitButton type="submit">
            <Plus size={16} />
            Agregar Artículo
          </SubmitButton>
        </ButtonContainer>
      </FormContainer>

      {composiciones.length > 0 && (
        <ComposicionesContainer>
          <ComposicionesHeader>
            <h3>Artículos Agregados</h3>
            <TotalMetros>
              Total: {totalMetrosCuadrados.toFixed(2)}m²
            </TotalMetros>
          </ComposicionesHeader>

          <Table>
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Ancho</th>
                <th>Largo</th>
                <th>m²</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {composiciones.map((comp, index) => (
                <tr key={index}>
                  <td>
                    {
                      ARTICULOS.find((art) => art.value === comp.articulo)
                        ?.label
                    }
                  </td>
                  <td>{comp.ancho}m</td>
                  <td>{comp.largo}m</td>
                  <td>{comp.metrosCuadrados.toFixed(2)}m²</td>
                  <td>{comp.observaciones}</td>
                  <td>
                    <DeleteButton
                      type="button"
                      onClick={() => handleRemoveComposicion(index)}
                    >
                      <Trash2 size={16} />
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ComposicionesContainer>
      )}

      <FinalButtonContainer>
        <CancelButton type="button" onClick={onClose}>
          Cancelar
        </CancelButton>
        <CreateButton
          type="button"
          onClick={handleCreateCasa}
          disabled={composiciones.length === 0 || !nombre.trim()}
        >
          Crear Casa
        </CreateButton>
      </FinalButtonContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem;
`;

const FormContainer = styled.form`
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  width: 100%;

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
  width: 100%;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 100%;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  color: #374151;
  background-color: white;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SubmitButton = styled(Button)`
  color: white;
  background-color: #3b82f6;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: #2563eb;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
`;

const ComposicionesContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 500;
    color: #374151;
  }

  tr:hover {
    background-color: #f9fafb;
  }
`;

const DeleteButton = styled.button`
  color: #9ca3af;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    color: #ef4444;
  }
`;

const FinalButtonContainer = styled(ButtonContainer)`
  margin-top: 2rem;
`;

const CreateButton = styled(SubmitButton)`
  background-color: #10b981;

  &:hover {
    background-color: #059669;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ComposicionesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
  }
`;

const TotalMetros = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #3b82f6;
`;

export default FormularioComposicion;
