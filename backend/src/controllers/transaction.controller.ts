import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as transactionService from '../services/transaction.service';

// GET /transactions
export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    const year = req.query.year ? Number(req.query.year) : undefined;

    const month = req.query.month ? Number(req.query.month) : undefined;

    const type = req.query.type === 'INCOME' || req.query.type === 'EXPENSE' ? req.query.type : undefined;

    const categoryId = typeof req.query.categoryId === 'string' ? req.query.categoryId : undefined;

    const keyword = typeof req.query.keyword === 'string' ? req.query.keyword : undefined;

    const result = await transactionService.getTransactions(userId, {
      page,
      limit,
      year,
      month,
      type,
      categoryId,
      keyword,
    });

    return res.json(result);
  } catch (error) {
    console.error('TRANSACTION LIST ERROR:', error);

    return res.status(500).json({
      message: '내역 조회 실패',
    });
  }
};

// GET /transactions/:id

export const getTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const transaction = await transactionService.getTransaction(
      userId,

      req.params.id as string,
    );

    if (!transaction) {
      return res.status(404).json({
        message: '내역 없음',
      });
    }

    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({
      message: '상세 조회 실패',
    });
  }
};

// POST /transactions

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const transaction = await transactionService.createTransaction(
      userId,

      req.body,
    );

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: '내역 생성 실패',
    });
  }
};

// PATCH /transactions/:id

export const updateTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const transaction = await transactionService.updateTransaction(
      userId,

      req.params.id as string,

      req.body,
    );

    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({
      message: '내역 수정 실패',
    });
  }
};

// DELETE /transactions/:id

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    await transactionService.deleteTransaction(
      userId,

      req.params.id as string,
    );

    return res.json({
      message: '삭제 완료',
    });
  } catch (error) {
    return res.status(500).json({
      message: '삭제 실패',
    });
  }
};
