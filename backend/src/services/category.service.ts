import { prisma } from "../prisma/client";
import { CreateCategoryDto, UpdateCategoryDto } from "../types/category";
import { category } from "../controllers/chart.controller";

// 목록 조회

export const getCategories = async (userId: string) => {
  return prisma.category.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
};

// 생성

export const createCategory = async (
  userId: string,

  data: CreateCategoryDto,
) => {
  return prisma.category.create({
    data: {
      name: data.name,

      type: data.type,

      icon: data.icon,

      color: data.color,

      userId,
    },
  });
};

// 수정
export const updateCategory = async (
  userId: string,
  id: string,
  data: UpdateCategoryDto,
) => {
  // 1. 현재 사용자의 카테고리인지 확인
  const category = await prisma.category.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!category) {
    throw new Error("카테고리를 찾을 수 없습니다.");
  }

  // 2. 이름이 변경되는 경우 중복 확인
  if (data.name && data.name !== category.name) {
    const existCategory = await prisma.category.findFirst({
      where: {
        userId,
        name: data.name,
        id: {
          not: id,
        },
      },
    });

    if (existCategory) {
      throw new Error("이미 존재하는 카테고리입니다.");
    }
  }

  // 3. 수정
  return prisma.category.update({
    where: {
      id: category.id,
    },
    data,
  });
};

// 삭제
export const deleteCategory = async (userId: string, id: string) => {
  // 1. 현재 사용자의 카테고리인지 확인
  const category = await prisma.category.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!category) {
    throw new Error("카테고리를 찾을 수 없습니다.");
  }

  // 2. 해당 카테고리를 사용하는 Transaction 확인
  const transactionCount = await prisma.transaction.count({
    where: {
      categoryId: id,
      userId,
    },
  });

  // 3. 사용 중인 카테고리는 삭제하지 않음
  if (transactionCount > 0) {
    throw new Error("사용 중인 카테고리는 삭제할 수 없습니다.");
  }

  // 4. 삭제
  return prisma.category.delete({
    where: {
      id: category.id,
    },
  });
};
