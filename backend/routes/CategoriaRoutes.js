import express from "express";
import {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/categoriaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, crearCategoria).get(protect, obtenerCategorias);

router
  .route("/:id")
  .put(protect, actualizarCategoria)
  .delete(protect, eliminarCategoria);

export default router;
