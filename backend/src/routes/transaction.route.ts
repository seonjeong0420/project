import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware';

import { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction, getCalendarTransactions, getTransactionsByDate } from '../controllers/transaction.controller';

const router = Router();

router.use(authMiddleware);

router.get('/calendar', getCalendarTransactions);

router.get('/date/:date', getTransactionsByDate);

router.get('/', getTransactions);

router.get('/:id', getTransaction);

router.post('/', createTransaction);

router.patch('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

export default router;
