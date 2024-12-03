import { Producto } from "../models/Producto.js";

// Crear producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria } = req.body;

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      categoria,
      usuario: req.user._id,
      fabrica: req.user.fabrica,
    });

    const productoGuardado = await producto.save();

    res.status(201).json({
      ok: true,
      productoGuardado,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      ok: false,
      message: "Error al crear el producto",
    });
  }
};

// Obtener productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ estado: true });

    res.json({
      ok: true,
      productos,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener los productos",
    });
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria } = req.body;

    const producto = await Producto.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio, categoria },
      { new: true }
    );

    res.json({
      ok: true,
      producto,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar el producto",
    });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndUpdate(id, { estado: false });

    res.json({
      ok: true,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      ok: false,
      message: "Error al eliminar el producto",
    });
  }
};

export {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
};
