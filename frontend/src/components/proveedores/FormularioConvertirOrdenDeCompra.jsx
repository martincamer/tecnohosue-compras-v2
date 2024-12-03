import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCompras } from "../../context/ComprasContext";
import { toast } from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { useProductos } from "../../context/ProductosContext";
import styled from "styled-components";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import clienteAxios from "../../config/axios";

// Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: "100%";
`;

const FormSection = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #f9fafb;
  width: "100%";
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 10px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  resize: none;
`;

const AddItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #eff6ff;
  }
`;

const ItemContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const RemoveItemButton = styled.button`
  color: #ef4444;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #fee2e2;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const TotalContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.875rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #93c5fd;
  }
`;

const FormularioConvertirOrdenDeCompra = ({
  proveedor,
  onClose,
  factura = null,
  orden,
}) => {
  const { TIPOS_FACTURA, METODOS_PAGO, setProveedor } = useCompras();

  const { productos, getProductos, setProductos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      invoiceNumber: factura?.invoiceNumber || "",
      invoiceType: factura?.invoiceType || "",
      date:
        factura?.date?.split("T")[0] || new Date().toISOString().split("T")[0],
      dueDate: factura?.dueDate?.split("T")[0] || "",
      items: factura?.items || [
        {
          product: "",
          description: "",
          quantity: "",
          unitPrice: "",
          taxRate: "21",
        },
      ],
      paymentMethod: factura?.paymentMethod || "",
      notes: factura?.notes || "",
    },
  });

  useEffect(() => {
    if (orden) {
      setValue(
        "items",
        orden.items.map((item) => ({
          product: item.product,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
        }))
      );
      setValue("notes", orden.notes || "");
    }
  }, [orden, setValue]);

  const items = watch("items");

  const addItem = () => {
    setValue("items", [
      ...items,
      {
        product: "",
        description: "",
        quantity: "1",
        unitPrice: "",
        taxRate: "21",
      },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setValue("items", newItems);
  };

  const convertOrderToInvoice = async (supplierId, orderId, data) => {
    try {
      const response = await clienteAxios.post(
        `/suppliers/${supplierId}/orders/${orderId}/convert`,
        data
      );
      setProveedor(response.data.supplier);
      return response.data;
    } catch (error) {
      console.error("Error al convertir la orden a factura:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await convertOrderToInvoice(proveedor._id, orden._id, {
        ...data,
        invoiceType: data.invoiceType,
      });

      if (response.ok) {
        onClose();
        toast.success(
          "Factura creada exitosamente a partir de la orden de compra"
        );
      } else {
        toast.error(response.message || "Error al crear la factura");
      }
    } catch (error) {
      console.error("Error al convertir la orden de compra a factura:", error);
      toast.error(
        error.response?.data?.message ||
          "Error al procesar la conversión de la orden a factura"
      );
    }
  };

  const calculateTotals = (items) => {
    return items.reduce(
      (acc, item) => {
        if (!item.quantity || !item.unitPrice) return acc;
        const subtotal = Number(item.quantity) * Number(item.unitPrice);
        const tax = (subtotal * Number(item.taxRate)) / 100;
        return {
          subtotal: acc.subtotal + subtotal,
          tax: acc.tax + tax,
          total: acc.total + subtotal + tax,
        };
      },
      { subtotal: 0, tax: 0, total: 0 }
    );
  };

  const totals = calculateTotals(items);

  const handleProductChange = (index, productId) => {
    const producto = productos.find((p) => p._id === productId);
    if (producto) {
      setValue(`items.${index}.description`, producto.description);
      setValue(`items.${index}.unitPrice`, producto.price);
      setValue(`items.${index}.taxRate`, 21); // IVA por defecto
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        {/* Datos de la Factura */}
        <FormSection>
          <SectionTitle>Datos de la Factura</SectionTitle>
          <FormRow>
            <FormGroup>
              <Label>Número de Factura *</Label>
              <Controller
                name="invoiceNumber"
                control={control}
                // rules={{
                //   required: "El número de factura es obligatorio",
                //   pattern: {
                //     value: /^\d{4}-\d{4}$/,
                //     message: "Formato inválido (ej: 0001-00000001)",
                //   },
                // }}
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="0001-00000001" />
                )}
              />
              {errors.invoiceNumber && (
                <ErrorText>{errors.invoiceNumber.message}</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Tipo de Factura *</Label>
              <Controller
                name="invoiceType"
                control={control}
                rules={{ required: "El tipo de factura es obligatorio" }}
                render={({ field }) => (
                  <StyledSelect {...field}>
                    <option value="">Seleccionar...</option>
                    {TIPOS_FACTURA.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </StyledSelect>
                )}
              />
              {errors.invoiceType && (
                <ErrorText>{errors.invoiceType.message}</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Fecha *</Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "La fecha es obligatoria" }}
                render={({ field }) => <Input {...field} type="date" />}
              />
              {errors.date && <ErrorText>{errors.date.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Fecha de Vencimiento</Label>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => <Input {...field} type="date" />}
              />
            </FormGroup>
          </FormRow>
        </FormSection>

        {/* Items */}
        <FormSection>
          <div className="flex justify-between items-center mb-4">
            <SectionTitle>Items</SectionTitle>
            <AddItemButton type="button" onClick={addItem}>
              <Plus size={20} />
              Agregar Item
            </AddItemButton>
          </div>

          {items.map((item, index) => (
            <ItemContainer key={index}>
              <FormRow>
                <FormGroup>
                  <Label>Producto *</Label>

                  {/* <Controller
                    name={`items.${index}.product`}
                    control={control}
                    rules={{ required: "El producto es requerido" }}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      // Encuentra el producto seleccionado por su ID
                      const selectedProduct = productos.find(
                        (producto) => producto._id === value
                      );

                      return (
                        <CreatableSelect
                          inputRef={ref}
                          value={
                            selectedProduct
                              ? {
                                  value: selectedProduct._id,
                                  label: selectedProduct.name,
                                }
                              : null
                          }
                          options={productos.map((producto) => ({
                            value: producto._id,
                            label: producto.name,
                          }))}
                          placeholder="Seleccionar o crear producto"
                          onChange={(selectedOption) => {
                            onChange(selectedOption?.value || ""); // Actualiza el valor con el ID
                            handleProductChange(
                              index,
                              selectedOption?.value || "",
                              selectedOption?.label // Sincroniza datos adicionales si se crea un nuevo producto
                            );
                          }}
                          onCreateOption={(newProductName) => {
                            // Crear una nueva opción en el estado
                            const newProduct = {
                              _id: `temp-${new Date().getTime()}`, // Genera un ID temporal único
                              name: newProductName,
                            };

                            // Actualiza la lista de productos
                            setProductos((prevProductos) => [
                              ...prevProductos,
                              newProduct,
                            ]);

                            // Asigna el nuevo producto como seleccionado
                            onChange(newProduct._id);
                            handleProductChange(
                              index,
                              newProduct._id,
                              newProduct.name
                            );
                          }}
                          onBlur={onBlur}
                          isClearable
                          styles={{
                            control: (base) => ({
                              ...base,
                              textTransform: "uppercase",
                            }),
                          }}
                        />
                      );
                    }}
                  /> */}
                  <Controller
                    name={`items.${index}.product`}
                    control={control}
                    rules={{ required: "El producto es requerido" }}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      const [filteredOptions, setFilteredOptions] =
                        React.useState([]);

                      const handleInputChange = (inputValue) => {
                        if (inputValue.trim() === "") {
                          setFilteredOptions([]); // Sin texto, no mostramos opciones
                        } else {
                          const filtered = productos
                            .filter((producto) =>
                              producto.name
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            )
                            .map((producto) => ({
                              value: producto._id,
                              label: producto.name,
                            }));
                          setFilteredOptions(filtered);
                        }
                      };

                      const selectedProduct = productos.find(
                        (producto) => producto._id === value
                      );

                      return (
                        <CreatableSelect
                          className="text-sm uppercase"
                          inputRef={ref}
                          value={
                            selectedProduct
                              ? {
                                  value: selectedProduct._id,
                                  label: selectedProduct.name,
                                }
                              : null
                          }
                          options={filteredOptions} // Muestra las opciones filtradas
                          placeholder="Escribe para buscar o crear producto"
                          onInputChange={handleInputChange} // Filtra dinámicamente
                          onChange={(selectedOption) => {
                            onChange(selectedOption?.value || ""); // Actualiza el valor con el ID
                            handleProductChange(
                              index,
                              selectedOption?.value || "",
                              selectedOption?.label
                            );
                          }}
                          onCreateOption={(newProductName) => {
                            const newProduct = {
                              _id: `temp-${new Date().getTime()}`, // Genera un ID temporal único
                              name: newProductName,
                            };

                            setProductos((prevProductos) => [
                              ...prevProductos,
                              newProduct,
                            ]);
                            onChange(newProduct._id);
                            handleProductChange(
                              index,
                              newProduct._id,
                              newProduct.name
                            );
                          }}
                          onBlur={onBlur}
                          isClearable
                          styles={{
                            control: (base) => ({
                              ...base,
                              textTransform: "uppercase",
                            }),
                          }}
                          noOptionsMessage={() => "Escribe para buscar"}
                        />
                      );
                    }}
                  />

                  {errors.items?.[index]?.product && (
                    <ErrorText>{errors.items[index].product.message}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Descripción *</Label>
                  <Controller
                    name={`items.${index}.description`}
                    control={control}
                    rules={{ required: "La descripción es obligatoria" }}
                    render={({ field }) => (
                      <Input
                        className="text-sm uppercase"
                        {...field}
                        type="text"
                        placeholder="Descripción"
                      />
                    )}
                  />
                  {errors.items?.[index]?.description && (
                    <ErrorText>
                      {errors.items[index].description.message}
                    </ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Cantidad *</Label>
                  <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    rules={{
                      required: "La cantidad es obligatoria",
                      min: {
                        value: 0.01,
                        message: "La cantidad debe ser mayor a 0",
                      },
                    }}
                    render={({ field }) => (
                      <Input {...field} type="number" min="0" step="1" />
                    )}
                  />
                  {errors.items?.[index]?.quantity && (
                    <ErrorText>
                      {errors.items[index].quantity.message}
                    </ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Precio Unitario *</Label>
                  <Controller
                    name={`items.${index}.unitPrice`}
                    control={control}
                    rules={{
                      required: "El precio es obligatorio",
                      min: {
                        value: 0.01,
                        message: "El precio debe ser mayor a 0",
                      },
                    }}
                    render={({ field }) => (
                      <Input {...field} type="number" min="0" step="0.01" />
                    )}
                  />
                  {errors.items?.[index]?.unitPrice && (
                    <ErrorText>
                      {errors.items[index].unitPrice.message}
                    </ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>IVA %</Label>
                  <Controller
                    name={`items.${index}.taxRate`}
                    control={control}
                    render={({ field }) => (
                      <StyledSelect {...field}>
                        <option value="">Seleccionar...</option>
                        <option value="21">21%</option>
                        <option value="10.5">10.5%</option>
                        <option value="27">27%</option>
                        <option value="0">0%</option>
                      </StyledSelect>
                    )}
                  />
                  {errors.items?.[index]?.taxRate && (
                    <ErrorText>{errors.items[index].taxRate.message}</ErrorText>
                  )}
                </FormGroup>

                {items.length > 1 && (
                  <RemoveItemButton
                    type="button"
                    onClick={() => removeItem(index)}
                    title="Eliminar item"
                  >
                    <Trash2 size={20} />
                  </RemoveItemButton>
                )}
              </FormRow>
            </ItemContainer>
          ))}

          <TotalContainer>
            <TotalRow>
              <span>Subtotal:</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </TotalRow>
            <TotalRow>
              <span>IVA:</span>
              <span>${totals.tax.toFixed(2)}</span>
            </TotalRow>
            <TotalRow>
              <span>Total:</span>
              <span>${totals.total.toFixed(2)}</span>
            </TotalRow>
          </TotalContainer>
        </FormSection>

        {/* Método de Pago y Notas */}
        <FormSection>
          <SectionTitle>Pago y Notas</SectionTitle>
          <FormRow>
            <FormGroup>
              <Label>Método de Pago</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <StyledSelect {...field}>
                    <option value="">Seleccionar...</option>
                    {METODOS_PAGO.map((metodo) => (
                      <option key={metodo.value} value={metodo.value}>
                        {metodo.label}
                      </option>
                    ))}
                  </StyledSelect>
                )}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Notas</Label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows="3"
                  placeholder="Notas adicionales..."
                />
              )}
            />
          </FormGroup>
        </FormSection>
      </FormGrid>

      <ButtonContainer>
        <CancelButton type="button" onClick={onClose}>
          Cancelar
        </CancelButton>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : factura ? "Actualizar" : "Crear"}{" "}
          Factura
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default FormularioConvertirOrdenDeCompra;
