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

    await categoryService.deleteCategory(
      userId,

      req.params.id,
    );

    return res.json({
      message: "삭제 완료",
    });
  } catch (error) {
    return res.status(500).json({
      message: "카테고리 삭제 실패",
    });
  }
};
