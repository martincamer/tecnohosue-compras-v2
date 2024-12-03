import { useState, useEffect } from "react";
import { useClientes } from "../../../context/ClientesContext";
import styled from "styled-components";

const ModalAgregarModelo = ({ clienteId, onSubmit }) => {
  const { getCasas, casas, addModeloContratado } = useClientes();
  const [casaSeleccionada, setCasaSeleccionada] = useState(null);

  const [formData, setFormData] = useState({
    casa_id: "",
    precio_final: "",
    forma_pago: "contado",
    anticipo: "",
    cuotas: "",
    valor_cuota: "",
    observaciones: "",
  });

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

    if (selectedValue === "") {
      // Si se selecciona la opción vacía, resetear todo
      setCasaSeleccionada(null);
      setFormData((prev) => ({
        ...prev,
        casa_id: "",
        precio_final: "",
      }));
      return;
    }

    const casa = casas.find((c) => c._id === selectedValue);
    setCasaSeleccionada(casa);
    if (casa) {
      setFormData((prev) => ({
        ...prev,
        casa_id: casa._id,
        precio_final: casa.precio || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // <ul class="dropdown-menu inner ">
  //   <li class="disabled">
  //     <a
  //       role="option"
  //       aria-disabled="true"
  //       tabindex="-1"
  //       class=""
  //       aria-selected="false"
  //     >
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text"></span>
  //     </a>
  //   </li>
  //   <li>
  //     <a role="option" aria-disabled="false" tabindex="0" aria-selected="false">
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text">a</span>
  //     </a>
  //   </li>
  //   <li class="">
  //     <a
  //       role="option"
  //       aria-disabled="false"
  //       tabindex="0"
  //       aria-selected="false"
  //       class=""
  //     >
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text">Contado</span>
  //     </a>
  //   </li>
  //   <li>
  //     <a role="option" aria-disabled="false" tabindex="0" aria-selected="false">
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text">b</span>
  //     </a>
  //   </li>
  //   <li class="">
  //     <a
  //       role="option"
  //       aria-disabled="false"
  //       tabindex="0"
  //       aria-selected="false"
  //       class=""
  //     >
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text">Anticipo mas Cuotas</span>
  //     </a>
  //   </li>
  //   <li class="selected active">
  //     <a
  //       role="option"
  //       aria-disabled="false"
  //       tabindex="0"
  //       aria-selected="true"
  //       class="selected active"
  //     >
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text">Todo Financiado</span>
  //     </a>
  //   </li>
  //   <li class="">
  //     <a
  //       role="option"
  //       aria-disabled="false"
  //       tabindex="0"
  //       aria-selected="false"
  //       class=""
  //     >
  //       <span class="glyphicon glyphicon-ok check-mark"></span>
  //       <span class="text">Contado Diferido</span>
  //     </a>
  //   </li>
  // </ul>;
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

        {casaSeleccionada && (
          <>
            <ComposicionCard>
              <SectionTitle>Composición de la Casa</SectionTitle>
              <ComposicionGrid>
                {casaSeleccionada.composiciones.map((comp, idx) => (
                  <ComposicionItem key={idx}>
                    <ItemTitle>{comp.articulo}</ItemTitle>
                    <ItemText>
                      {comp.ancho}m x {comp.largo}m = {comp.metrosCuadrados}m²
                    </ItemText>
                    {comp.observaciones && (
                      <ItemObs>{comp.observaciones}</ItemObs>
                    )}
                  </ComposicionItem>
                ))}
              </ComposicionGrid>
            </ComposicionCard>

            <FormGrid>
              <FormGroup>
                <Label>Precio Final</Label>
                <Input
                  type="number"
                  value={formData.precio_final}
                  onChange={(e) =>
                    setFormData({ ...formData, precio_final: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Forma de Pago</Label>
                <Select
                  value={formData.forma_pago}
                  onChange={(e) =>
                    setFormData({ ...formData, forma_pago: e.target.value })
                  }
                  required
                >
                  <option value="contado">Contado</option>
                  <option value="financiado">Anticipo + cuotas</option>
                </Select>
              </FormGroup>

              {formData.forma_pago === "financiado" && (
                <>
                  <FormGroup>
                    <Label>Anticipo</Label>
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
                    <Label>Cuotas</Label>
                    <Input
                      type="number"
                      value={formData.cuotas}
                      onChange={(e) =>
                        setFormData({ ...formData, cuotas: e.target.value })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Valor de Cuota</Label>
                    <Input
                      type="number"
                      value={formData.valor_cuota}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          valor_cuota: e.target.value,
                        })
                      }
                      required
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
