import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Header 확인
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "인증 토큰이 없습니다.",
      });
    }

    // Bearer token 분리
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "토큰 형식이 올바르지 않습니다.",
      });
    }

    // JWT 검증
    const decoded = jwt.verify(token, SECRET) as {
      id: string;
      email: string;
    };

    // request에 사용자 저장
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
