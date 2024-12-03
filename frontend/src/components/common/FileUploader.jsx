import axios from "axios";
import styled from "styled-components";
import { useState, useRef } from "react";
import { Upload, CheckCircle, Loader } from "lucide-react";

export const FileUploader = ({
  onFileSelect,
  currentFile,
  acceptedTypes = "all",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const getAcceptedTypes = () => {
    switch (acceptedTypes) {
      case "image":
        return "image/*";
      case "pdf":
        return ".pdf";
      case "all":
      default:
        return "image/*,.pdf";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const fileType = file?.type?.startsWith("image/") ? "image" : "pdf";
      data.append(
        "upload_preset",
        fileType === "image" ? "imagenes" : "documentos"
      );

      const resourceType = fileType === "image" ? "image" : "raw";
      const api = `https://api.cloudinary.com/v1_1/de4aqqalo/${resourceType}/upload`;

      const res = await axios.post(api, data);
      onFileSelect(res.data.secure_url);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadContainer
      isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept={getAcceptedTypes()}
        style={{ display: "none" }}
      />

      {uploading ? (
        <UploadStatus>
          <Loader className="animate-spin" size={20} />
          <span>Subiendo archivo...</span>
        </UploadStatus>
      ) : currentFile ? (
        <UploadStatus>
          <CheckCircle className="text-green-500" size={20} />
          <span className="text-green-600">Archivo subido correctamente</span>
        </UploadStatus>
      ) : (
        <UploadContent>
          <Upload size={48} className="text-gray-400" />
          <UploadText>
            <span className="text-blue-500 hover:text-blue-600">
              Sube un archivo
            </span>
            <p>o arrastra y suelta aquí</p>
          </UploadText>
        </UploadContent>
      )}
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  border: 2px dashed ${(props) => (props.isDragging ? "#3B82F6" : "#D1D5DB")};
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isDragging ? "#EFF6FF" : "white")};

  &:hover {
    border-color: #3b82f6;
  }
`;

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UploadText = styled.div`
  display: flex;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const UploadStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
