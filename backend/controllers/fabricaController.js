import { Fabrica } from "../models/Fabrica.js";

// Crear fábrica
const crearFabrica = async (req, res) => {
  try {
    const { nombre, direccion } = req.body;

    const fabrica = await Fabrica.create({
      nombre,
      direccion,
      // Los demás campos usarán los valores por defecto
    });

    res.status(201).json({
      ok: true,
      fabrica,
    });
  } catch (error) {
    console.error("Error al crear fábrica:", error);
    res.status(500).json({
      ok: false,
      message: "Error al crear la fábrica",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Obtener todas las fábricas
const obtenerFabricas = async (req, res) => {
  try {
    const fabricas = await Fabrica.find({ estado: true });

    res.json({
      ok: true,
      fabricas,
    });
  } catch (error) {
    console.error("Error al obtener fábricas:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener las fábricas",
    });
  }
};

// Obtener una fábrica por ID
const obtenerFabrica = async (req, res) => {
  try {
    const { id } = req.params;
    const fabrica = await Fabrica.findById(id);

    if (!fabrica) {
      return res.status(404).json({
        ok: false,
        message: "Fábrica no encontrada",
      });
    }

    res.json({
      ok: true,
      fabrica,
    });
  } catch (error) {
    console.error("Error al obtener fábrica:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener la fábrica",
    });
  }
};

// Actualizar fábrica
const actualizarFabrica = async (req, res) => {
  try {
    const { id } = req.params;
    const fabrica = await Fabrica.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!fabrica) {
      return res.status(404).json({
        ok: false,
        message: "Fábrica no encontrada",
      });
    }

    res.json({
      ok: true,
      fabrica,
    });
  } catch (error) {
    console.error("Error al actualizar fábrica:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar la fábrica",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Eliminar fábrica (soft delete)
const eliminarFabrica = async (req, res) => {
  try {
    const { id } = req.params;
    const fabrica = await Fabrica.findByIdAndUpdate(
      id,
      { estado: false },
      {
        new: true,
      }
    );

    if (!fabrica) {
      return res.status(404).json({
        ok: false,
        message: "Fábrica no encontrada",
      });
    }

    res.json({
      ok: true,
      message: "Fábrica eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar fábrica:", error);
    res.status(500).json({
      ok: false,
      message: "Error al eliminar la fábrica",
    });
  }
};

export {
  crearFabrica,
  obtenerFabricas,
  obtenerFabrica,
  actualizarFabrica,
  eliminarFabrica,
};
