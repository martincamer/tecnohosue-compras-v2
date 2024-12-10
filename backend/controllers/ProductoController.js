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

    const productos = await Producto.find({
      estado: true,
      fabrica: req.user.fabrica,
    });

    res.json({
      ok: true,
      productoGuardado,
      productos,
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
    const productos = await Producto.find({
      estado: true,
      fabrica: req.user.fabrica,
    });

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

// Obtener producto por ID
const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      ok: true,
      producto,
    });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener el producto",
    });
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria } = req.body;

    // Actualizar el producto
    const producto = await Producto.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio, categoria },
      { new: true }
    );

    // Obtener todos los productos activos de la fábrica
    const productos = await Producto.find({
      estado: true,
      fabrica: req.user.fabrica,
    });

    res.json({
      ok: true,
      producto,
      productos,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar el producto",
    });
  }
};

// Eliminar producto (soft delete)
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el producto primero
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    // Actualizar explícitamente el estado
    producto.estado = false;
    await producto.save();

    // Verificar que se haya actualizado
    const productoActualizado = await Producto.findById(id);
    console.log("Estado del producto actualizado:", productoActualizado.estado);

    const productos = await Producto.find({
      estado: true,
      fabrica: req.user.fabrica,
    });

    res.json({
      ok: true,
      productoActualizado,
      productos,
    });
  } catch (error) {
    console.error("Error al desactivar producto:", error);
    res.status(500).json({
      ok: false,
      message: "Error al desactivar el producto",
      error: error.message,
    });
  }
};

export {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
