import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import * as chartService from "../services/chart.service";

// 월별 소비

export const monthly = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const year = Number(req.query.year) || new Date().getFullYear();

    const result = await chartService.getMonthlyChart(userId, year);

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "월별 차트 조회 실패",
    });
  }
};

// 카테고리

export const category = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const now = new Date();

    const year = Number(req.query.year) || now.getFullYear();

    const month = Number(req.query.month) || now.getMonth() + 1;

    const result = await chartService.getCategoryChart(
      userId,

      year,

      month,
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "카테고리 차트 실패",
    });
  }
};

// 일별

export const daily = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const now = new Date();

    const year = Number(req.query.year) || now.getFullYear();

    const month = Number(req.query.month) || now.getMonth() + 1;

    const result = await chartService.getDailyChart(
      userId,

      year,

      month,
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "일별 차트 실패",
    });
  }
};
