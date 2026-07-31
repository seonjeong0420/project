import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getTransactions);

router.get("/:id", getTransaction);

router.post("/", createTransaction);

router.patch("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;
