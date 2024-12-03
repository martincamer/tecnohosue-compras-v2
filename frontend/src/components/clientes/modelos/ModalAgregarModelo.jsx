import { useState, useEffect } from "react";
import { useClientes } from "../../../context/ClientesContext";
import styled from "styled-components";

const ModalAgregarModelo = ({ clienteId, onSubmit }) => {
  const { getCasas, casas, addModeloContratado } = useClientes();
  const [casaSeleccionada, setCasaSeleccionada] = useState(null);

  const [formData, setFormData] = useState({
    casa_id: "",
    precio_final: "",
    pagado: "",
    anticipo: "",
    cuotas: "",
    valor_final: "",
    valor_cuota: "",
    forma_pago: "contado",
    observaciones: "",
    fecha_cancelacion_anticipo: "",
    fecha_cancelacion_diferido: "",
  });

  const calcularTotalCuotas = () => {
    // const totalAnticipo = parseFloat(formData.anticipo) || 0;
    const totalVivienda = parseFloat(formData.valor_final) || 0;

    const numCuotas = parseInt(formData.cuotas) || 0;

    const totalCuotas =
      numCuotas > 0 ? (totalVivienda / numCuotas).toFixed(2) : 0;

    setFormData((prev) => ({ ...prev, valor_cuota: totalCuotas }));
  };

  useEffect(() => {
    calcularTotalCuotas();
  }, [formData.valor_final, formData.cuotas]);

  useEffect(() => {
    const init = async () => {
      if (!casas || casas.length === 0) {
        await getCasas();
      }
    };
    init();
  }, []);

  const handleCasaChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Casa seleccionada:", selectedValue);

    if (selectedValue === "") {
      setCasaSeleccionada(null);
      setFormData((prev) => ({
        ...prev,
        casa_id: "",
        anticipo: "",
        cuotas: "",
        valor_final: "",
        valor_cuota: "",
      }));
      return;
    }

    const casa = casas.find((c) => c._id === selectedValue);
    setCasaSeleccionada(casa);
    if (casa) {
      setFormData((prev) => ({
        ...prev,
        casa_id: casa._id,
        anticipo: casa.anticipo || "",
        cuotas: casa.cuotas || "",
        valor_final: casa.valor_final || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", {
      ...formData,
      composiciones: casaSeleccionada?.composiciones || [],
    });

    try {
      const result = await addModeloContratado(clienteId, {
        ...formData,
        composiciones: casaSeleccionada?.composiciones || [],
      });

      if (result.success) {
        onSubmit(result.data);
      }
    } catch (error) {
      console.error("Error al guardar modelo:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Seleccionar Casa</Label>
          <Select value={formData.casa_id} onChange={handleCasaChange} required>
            <option value="">Seleccione una casa</option>
            {casas?.map((casa) => (
              <option key={casa._id} value={casa._id}>
                {casa.nombre} - {casa.totalMetrosCuadrados}m²
              </option>
            ))}
          </Select>
        </FormGroup>

        <ComposicionCard>
          <SectionTitle>Composición de la Casa</SectionTitle>
          <ComposicionGrid>
            {casaSeleccionada?.composiciones.map((comp, idx) => (
              <ComposicionItem key={idx}>
                <ItemTitle>{comp.articulo}</ItemTitle>
                <ItemText>
                  {comp.ancho}m x {comp.largo}m = {comp.metrosCuadrados}m²
                </ItemText>
                {comp.observaciones && <ItemObs>{comp.observaciones}</ItemObs>}
              </ComposicionItem>
            ))}
          </ComposicionGrid>
        </ComposicionCard>

        {casaSeleccionada && (
          <>
            <FormGrid>
              <FormGroup>
                <Label>Forma de Pago</Label>
                <Select
                  value={formData.forma_pago}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setFormData({
                      ...formData,
                      forma_pago: selectedValue,
                      precio_final:
                        selectedValue === "contado"
                          ? ""
                          : formData.precio_final,
                      anticipo:
                        selectedValue === "contado" ? "" : formData.anticipo,
                      pagado:
                        selectedValue === "contado" ? "" : formData.pagado,
                      cuotas:
                        selectedValue === "contado" ? "" : formData.cuotas,
                      valor_final:
                        selectedValue === "contado" ? "" : formData.valor_final,
                      valor_cuota:
                        selectedValue === "contado" ? "" : formData.valor_cuota,
                    });
                  }}
                  required
                >
                  <option value="contado">Contado</option>
                  <option value="anticipo_cuotas">Anticipo + Cuotas</option>
                  <option value="contado_diferido">Contado Diferido</option>
                  <option value="todo_financiado">Todo Financiado</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Precio Final</Label>
                <Input
                  type="number"
                  value={formData.precio_final}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      precio_final: e.target.value,
                    })
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Monto Pagado por el cliente / entrega.</Label>
                <Input
                  type="number"
                  value={formData.pagado}
                  onChange={(e) =>
                    setFormData({ ...formData, pagado: e.target.value })
                  }
                  required
                />
              </FormGroup>

              {formData.forma_pago === "anticipo_cuotas" && (
                <>
                  <FormGroup>
                    <Label>Monto de Anticipo</Label>
                    <Input
                      type="number"
                      value={formData.anticipo}
                      onChange={(e) =>
                        setFormData({ ...formData, anticipo: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Número de Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.cuotas}
                      onChange={(e) => {
                        setFormData({ ...formData, cuotas: e.target.value });
                      }}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor Final para Generar Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.valor_final}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          valor_final: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor de Cuota</Label>
                    <Input
                      type="text"
                      value={formData.valor_cuota}
                      readOnly // Solo lectura, se calcula automáticamente
                    />
                  </FormGroup>
                </>
              )}

              {formData.forma_pago === "todo_financiado" && (
                <>
                  <FormGroup>
                    <Label>Número de Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.cuotas}
                      onChange={(e) => {
                        setFormData({ ...formData, cuotas: e.target.value });
                      }}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor Final para Generar Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.valor_final}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          valor_final: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor de Cuota</Label>
                    <Input
                      type="text"
                      value={formData.valor_cuota}
                      readOnly // Solo lectura, se calcula automáticamente
                    />
                  </FormGroup>
                </>
              )}

              {formData.forma_pago === "contado_diferido" && (
                <>
                  <FormGroup>
                    <Label>Monto de Anticipo</Label>
                    <Input
                      type="number"
                      value={formData.anticipo}
                      onChange={(e) =>
                        setFormData({ ...formData, anticipo: e.target.value })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Número de Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.cuotas}
                      onChange={(e) => {
                        setFormData({ ...formData, cuotas: e.target.value });
                      }}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor Final para Generar Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.valor_final}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          valor_final: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor de Cuota</Label>
                    <Input
                      type="text"
                      value={formData.valor_cuota}
                      readOnly // Solo lectura, se calcula automáticamente
                    />
                  </FormGroup>
                </>
              )}
            </FormGrid>
          </>
        )}

        <FormGroup>
          <Label>Observaciones</Label>
          <Textarea
            value={formData.observaciones}
            onChange={(e) =>
              setFormData({ ...formData, observaciones: e.target.value })
            }
            rows="3"
          />
        </FormGroup>

        <SubmitButton type="submit">Guardar</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  text-transform: capitalize;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ComposicionCard = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ComposicionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const ComposicionItem = styled.div`
  background-color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ItemTitle = styled.p`
  font-weight: 500;
  color: #111827;
`;

const ItemText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ItemObs = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

const SectionTitle = styled.h3`
  font-weight: 500;
  color: #111827;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const LoadingContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`;

export default ModalAgregarModelo;
