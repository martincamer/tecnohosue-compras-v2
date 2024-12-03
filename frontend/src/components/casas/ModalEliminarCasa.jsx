import styled from "styled-components";

const ModalEliminarCasa = ({ casa, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(casa._id);
  };

  return (
    <Container>
      <Title>¿Eliminar Casa?</Title>
      <Message>
        ¿Estás seguro que deseas eliminar la casa{" "}
        <Strong>{casa?.nombre}</Strong>? Esta acción no se puede deshacer.
      </Message>
      <ButtonContainer>
        <CancelButton onClick={onClose}>Cancelar</CancelButton>
        <DeleteButton onClick={handleConfirm}>Eliminar</DeleteButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const Strong = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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

const DeleteButton = styled(Button)`
  background-color: #ef4444;
  color: white;

  &:hover {
    background-color: #dc2626;
  }
`;

export default ModalEliminarCasa;
