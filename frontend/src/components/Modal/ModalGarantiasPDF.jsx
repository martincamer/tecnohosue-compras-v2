import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import GarantiasPDF from "../clientes/legales/GarantiasPDF";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  height: 80%;
  border-radius: 8px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ModalGarantiasPDF = ({ isOpen, onClose, cliente }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <GarantiasPDF cliente={cliente} />
        </PDFViewer>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalGarantiasPDF;
