import { createContext, useState, useContext, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import getConfig from "../helpers/configHeader";
import { toast } from "react-hot-toast";

const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    try {
      const { data } = await clienteAxios("/categorias", getConfig());
      setCategorias(data.categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const createCategoria = async (categoriaData) => {
    try {
      const { data } = await clienteAxios.post(
        "/categorias",
        categoriaData,
        getConfig()
      );
      if (data.ok) {
        setCategorias([...categorias, data.categoria]);
        toast.success("Categoría creada exitosamente");
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Error al crear categoría:", error);
      toast.error(
        error.response?.data?.message || "Error al crear la categoría"
      );
      return { success: false, message: error.response?.data?.message };
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <CategoriasContext.Provider
      value={{ categorias, getCategorias, createCategoria }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error(
      "useCategorias debe usarse dentro de un CategoriasProvider"
    );
  }
  return context;
};
