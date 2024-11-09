import Router from "express";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import { createSong, deleteSong } from "../controllers/admin.controller.js";

const router = Router();

router.post("/songs", protectRoute, requiredAdmin, createSong);
router.delete("/songs/:id", protectRoute, requiredAdmin, deleteSong);
export default router;
