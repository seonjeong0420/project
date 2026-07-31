import { prisma } from "../prisma/client";
import { CreateCategoryDto, UpdateCategoryDto } from "../types/category";

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
  return prisma.category.update({
    where: {
      id,

      userId,
    },

    data,
  });
};

// 삭제

export const deleteCategory = async (
  userId: string,

  id: string,
) => {
  return prisma.category.delete({
    where: {
      id,

      userId,
    },
  });
};
