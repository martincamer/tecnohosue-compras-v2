import express from "express";
import {
  crearFabrica,
  obtenerFabricas,
  obtenerFabrica,
  actualizarFabrica,
  eliminarFabrica,
} from "../controllers/fabricaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas protegidas
router.route("/").post(protect, crearFabrica).get(obtenerFabricas);

router
  .route("/:id")
  .get(protect, obtenerFabrica)
  .put(protect, actualizarFabrica)
  .delete(protect, eliminarFabrica);

export default router;
