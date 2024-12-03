import express from "express";
import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, crearProducto).get(protect, obtenerProductos);

router
  .route("/:id")
  .put(protect, actualizarProducto)
  .delete(protect, eliminarProducto);

export default router;
