import styled from "styled-components";

// Contenedor del formulario
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Grid del formulario
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

// Sección del formulario
export const FormSection = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #f9fafb;
`;

// Título de la sección
export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

// Fila del formulario
export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

// Grupo de formulario
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

// Etiqueta
export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

// Input
export const Input = styled.input`
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

// Botón para agregar item
export const AddItemButton = styled.button`
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

// Contenedor de cada item
export const ItemContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// Botón para eliminar item
export const RemoveItemButton = styled.button`
  color: #ef4444;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #fee2e2;
  }
`;

// Texto de error
export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
`;

// Contenedor de totales
export const TotalContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

// Fila de totales
export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.875rem;

  &:last-child {
    font-weight: 600;
    font-size: 1rem;
    border-top: 1px solid #e5e7eb;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }
`;
