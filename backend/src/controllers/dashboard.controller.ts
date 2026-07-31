import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import { getDashboard } from "../services/dashboard.service";

export const dashboard = async (
  req: AuthRequest,

  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const now = new Date();

    const year = Number(req.query.year) || now.getFullYear();

    const month = Number(req.query.month) || now.getMonth() + 1;

    const result = await getDashboard(
      userId,

      year,

      month,
    );

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "대시보드 조회 실패",
    });
  }
};
