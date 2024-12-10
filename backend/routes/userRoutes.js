import express from "express";
import {
  register,
  login,
  getProfile,
  registerWithGoogle,
  getAllUsersPermissions,
  getUserPermissions,
  updateUserPermissions,
  loginWithGoogle,
  updateUserStatus,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/google", registerWithGoogle);
router.post("/login-google", loginWithGoogle);
router.get("/permissions", protect, getAllUsersPermissions);
router.get("/permissions/:userId", protect, getUserPermissions);
router.put("/permissions/:userId", protect, updateUserPermissions);
router.put("/status", protect, updateUserStatus);

export default router;
