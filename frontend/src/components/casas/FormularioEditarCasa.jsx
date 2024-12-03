import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { FileUploader } from "../common/FileUploader";

const FormularioEditarCasa = ({ casa, onClose, onSubmit }) => {
  const [composiciones, setComposiciones] = useState(casa?.composiciones || []);
  const [totalMetrosCuadrados, setTotalMetrosCuadrados] = useState(
    casa?.totalMetrosCuadrados || 0
  );
  const [imagen, setImagen] = useState(casa?.imagen || null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: casa?.nombre || "",
      articulo: "",
      ancho: "",
      largo: "",
      observaciones: "",
      isActive: casa?.isActive ?? true,
    },
  });

  const ARTICULOS = [
    { value: "dormitorio", label: "Dormitorio" },
    { value: "baño", label: "Baño" },
    { value: "comedor", label: "Comedor" },
    { value: "galeria", label: "Galería" },
    { value: "cocina", label: "Cocina" },
    { value: "garage", label: "Garage" },
    { value: "vestidor", label: "Vestidor" },
    { value: "pasillo", label: "Pasillo" },
    { value: "sala_estar", label: "Sala de Estar" },
    { value: "lavadero", label: "Lavadero" },
  ];

  const onSubmitComposicion = async (data) => {
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

      reset({
        ...data,
        articulo: "",
        ancho: "",
        largo: "",
        observaciones: "",
      });
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

  const handleUpdateCasa = async (data) => {
    if (composiciones.length === 0) {
      toast.error("Debe agregar al menos un artículo");
      return;
    }

    try {
      const casaData = {
        ...data,
        composiciones,
        totalMetrosCuadrados,
        imagen,
      };

      await onSubmit(casa._id, casaData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar casa:", error);
      toast.error(error.message || "Error al actualizar la casa");
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmitComposicion)}>
        <FormGroup>
          <Label>Nombre de la Casa</Label>
          <Controller
            name="nombre"
            control={control}
            rules={{
              required: "El nombre es obligatorio",
              maxLength: {
                value: 100,
                message: "El nombre no puede exceder los 100 caracteres",
              },
            }}
            render={({ field }) => (
              <Input {...field} type="text" error={errors.nombre} />
            )}
          />
          {errors.nombre && <ErrorText>{errors.nombre.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Imagen</Label>
          <FileUploader
            onFileSelect={(file) => setImagen(file)}
            currentFile={imagen}
            acceptedTypes="image"
          />
        </FormGroup>

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
              <Label>Ancho (metros)</Label>
              <Controller
                name="ancho"
                control={control}
                rules={{
                  required: "El ancho es obligatorio",
                  min: {
                    value: 0.01,
                    message: "El ancho debe ser mayor a 0",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    error={errors.ancho}
                  />
                )}
              />
              {errors.ancho && <ErrorText>{errors.ancho.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Largo (metros)</Label>
              <Controller
                name="largo"
                control={control}
                rules={{
                  required: "El largo es obligatorio",
                  min: {
                    value: 0.01,
                    message: "El largo debe ser mayor a 0",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    error={errors.largo}
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
              render={({ field }) => <TextArea {...field} />}
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
                <th></th>
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
                      title="Eliminar artículo"
                    >
                      <Trash2 size={18} />
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
          onClick={handleSubmit(handleUpdateCasa)}
          disabled={composiciones.length === 0}
        >
          Guardar Cambios
        </CreateButton>
      </FinalButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
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

const SaveButton = styled(Button)`
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
  }
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const ComposicionesContainer = styled.div`
  margin-top: 1.5rem;
`;

const ComposicionesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TotalMetros = styled.span`
  font-weight: 500;
  color: #374151;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SubmitButton = styled(Button)`
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
  }
`;

const FinalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const CreateButton = styled(Button)`
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f3f4f6;
  color: #374151;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export default FormularioEditarCasa;
