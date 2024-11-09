import Router from "express";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import {
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.js";

const router = Router();
router.length("/check", protectRoute, requiredAdmin, checkAdmin);
router.post("/songs", protectRoute, requiredAdmin, createSong);
router.delete("/songs/:id", protectRoute, requiredAdmin, deleteSong);
router.post("/albums", protectRoute, requiredAdmin, createAlbum);
router.delete("/albums/:id", protectRoute, requiredAdmin, deleteAlbum);

export default router;
