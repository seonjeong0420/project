import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../prisma/client";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "사용자 정보 없음",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "사용자 조회 실패",
    });
  }
};
