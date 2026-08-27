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

//캘린더
export const getCalendarTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const year = Number(req.query.year);
    const month = Number(req.query.month);

    if (!year || !month) {
      return res.status(400).json({
        message: 'year와 month는 필수입니다.',
      });
    }

    if (month < 1 || month > 12) {
      return res.status(400).json({
        message: 'month는 1~12 사이여야 합니다.',
      });
    }

    const result = await transactionService.getCalendarTransactions(userId, year, month);

    return res.json(result);
  } catch (error) {
    console.error('CALENDAR TRANSACTION ERROR:', error);

    return res.status(500).json({
      message: '캘린더 내역 조회 실패',
    });
  }
};

// 날짜별 조회
export const getTransactionsByDate = async (req: AuthRequest<{ date: string }>, res: Response) => {
  try {
    const userId = req.user!.id;

    const { date } = req.params;

    const transactions = await transactionService.getTransactionsByDate(userId, date);

    return res.json(transactions);
  } catch (error) {
    console.error('TRANSACTION DATE ERROR:', error);

    return res.status(500).json({
      message: '날짜별 내역 조회 실패',
    });
  }
};
