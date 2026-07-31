import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import { monthly, category, daily } from "../controllers/chart.controller";

const router = Router();

router.use(authMiddleware);

router.get("/monthly", monthly);

router.get("/category", category);

router.get("/daily", daily);

export default router;
