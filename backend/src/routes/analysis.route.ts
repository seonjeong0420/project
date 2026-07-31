import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import { monthlyAnalysis } from "../controllers/analysis.controller";

const router = Router();

router.use(authMiddleware);

router.get("/month", monthlyAnalysis);

export default router;
