import Router from "express";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import { createSong } from "../controllers/admin.controller.js";

const router = Router();

router.post("/songs", protectRoute, requiredAdmin, createSong);
export default router;
