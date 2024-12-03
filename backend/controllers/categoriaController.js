import { Categoria } from "../models/Categoria.js";

// Crear categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Verificar si ya existe una categoría con ese nombre
    const categoriaExiste = await Categoria.findOne({ nombre });
    if (categoriaExiste) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe una categoría con ese nombre",
      });
    }

    const categoria = await Categoria.create({
      nombre,
      descripcion,
      usuario: req.user._id,
      fabrica: req.user.fabrica,
    });

    res.status(201).json({
      ok: true,
      categoria,
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({
      ok: false,
      message: "Error al crear la categoría",
    });
  }
};

// Obtener categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({ estado: true })
      .populate("usuario", "nombre")
      .populate("fabrica", "nombre");

    res.json({
      ok: true,
      categorias,
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener las categorías",
    });
  }
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true }
    );

    res.json({
      ok: true,
      categoria,
    });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar la categoría",
    });
  }
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
      ok: true,
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({
      ok: false,
      message: "Error al eliminar la categoría",
    });
  }
};

export {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
};
