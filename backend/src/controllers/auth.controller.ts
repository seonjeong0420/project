import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

// 회원가입
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return res.status(409).json({
        message: "이미 가입된 이메일입니다.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).json({
      id: user.id,

      email: user.email,

      name: user.name,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "회원가입 실패",
    });
  }
};

// 로그인
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(
      password,

      user.password,
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // Access Token 생성
    const accessToken = createAccessToken({
      id: user.id,

      email: user.email,
    });

    // Refresh Token 생성
    const refreshToken = createRefreshToken({
      id: user.id,

      email: user.email,
    });

    // ⭐ Refresh Token DB 저장
    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        refreshToken,
      },
    });

    // ⭐ Refresh Token Cookie 저장
    res.cookie(
      "refreshToken",

      refreshToken,

      {
        httpOnly: true,

        secure: false,
        // production에서는 true

        sameSite: "lax",

        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    );

    return res.status(200).json({
      accessToken,

      user: {
        id: user.id,

        email: user.email,

        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "로그인 실패",
    });
  }
};

// Access Token 재발급
export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "refresh token 없음",
      });
    }

    const decoded = jwt.verify(
      token,

      process.env.JWT_REFRESH_SECRET as string,
    ) as {
      id: string;

      email: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({
        message: "refresh token 오류",
      });
    }

    const accessToken = createAccessToken({
      id: user.id,

      email: user.email,
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "refresh 실패",
    });
  }
};

// 로그아웃
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      await prisma.user.updateMany({
        where: {
          refreshToken: token,
        },

        data: {
          refreshToken: null,
        },
      });
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "logout success",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "logout 실패",
    });
  }
};
