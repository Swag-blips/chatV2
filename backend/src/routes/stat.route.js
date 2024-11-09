import Router from "express";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controllers/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requiredAdmin, getStats);
export default router;
