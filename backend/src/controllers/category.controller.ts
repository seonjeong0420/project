import { Request, Response } from "express";
import * as categoryService from "../services/category.service";

// GET /categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const categories = await categoryService.getCategories(userId);

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "카테고리 조회 실패",
    });
  }
};

// POST /categories
export const createCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const category = await categoryService.createCategory(
      userId,

      req.body,
    );

    return res.status(201).json(category);
  } catch (error) {
    console.error("CATEGORY CREATE ERROR:", error);

    return res.status(500).json({
      message: "카테고리 생성 실패",
    });
  }
};

// PATCH /categories/:id
export const updateCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    const category = await categoryService.updateCategory(
      userId,
      req.params.id,
      req.body,
    );

    return res.json(category);
  } catch (error) {
    console.error("CATEGORY UPDATE ERROR:", error);

    // 카테고리 없음
    if (
      error instanceof Error &&
      error.message === "카테고리를 찾을 수 없습니다."
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    // 카테고리 이름 중복
    if (
      error instanceof Error &&
      error.message === "이미 존재하는 카테고리입니다."
    ) {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "카테고리 수정 실패",
    });
  }
};

// DELETE /categories/:id
export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    await categoryService.deleteCategory(userId, req.params.id);

    return res.json({
      message: "카테고리가 삭제되었습니다.",
    });
  } catch (error) {
    console.error("CATEGORY DELETE ERROR:", error);

    if (
      error instanceof Error &&
      error.message === "사용 중인 카테고리는 삭제할 수 없습니다."
    ) {
      return res.status(409).json({
        message: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message === "카테고리를 찾을 수 없습니다."
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "카테고리 삭제 실패",
    });
  }
};
