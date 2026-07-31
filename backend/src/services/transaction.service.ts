import { prisma } from "../prisma/client";
import { TransactionQuery } from "../types/transaction";
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../types/transaction";

// 목록 조회
export const getTransactions = async (
  userId: string,

  query: TransactionQuery,
) => {
  const { type, keyword, year, month, startDate, endDate } = query;

  const where: any = {
    userId,
  };

  // 수입 / 지출 필터

  if (type) {
    where.type = type;
  }

  // 검색

  if (keyword) {
    where.OR = [
      {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },

      {
        memo: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    ];
  }

  // 날짜 조건

  if (year && month) {
    const start = new Date(Number(year), Number(month) - 1, 1);

    const end = new Date(Number(year), Number(month), 1);

    where.date = {
      gte: start,

      lt: end,
    };
  }

  // 기간 검색

  if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),

      lte: new Date(endDate),
    };
  }

  return prisma.transaction.findMany({
    where,

    include: {
      category: true,
    },

    orderBy: {
      date: "desc",
    },
  });
};

// 상세 조회

export const getTransaction = async (
  userId: string,

  id: string,
) => {
  return prisma.transaction.findFirst({
    where: {
      id,

      userId,
    },

    include: {
      category: true,
    },
  });
};

// 생성

export const createTransaction = async (
  userId: string,

  data: CreateTransactionDto,
) => {
  // 카테고리 소유권 확인

  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,

      userId,
    },
  });

  if (!category) {
    throw new Error("카테고리를 찾을 수 없습니다.");
  }

  return prisma.transaction.create({
    data: {
      title: data.title,

      amount: data.amount,

      memo: data.memo,

      type: data.type,

      date: new Date(data.date),

      categoryId: data.categoryId,

      userId,
    },
  });
};

// 수정

export const updateTransaction = async (
  userId: string,

  id: string,

  data: UpdateTransactionDto,
) => {
  return prisma.transaction.update({
    where: {
      id,

      userId,
    },

    data: {
      ...data,

      date: data.date ? new Date(data.date) : undefined,
    },
  });
};

// 삭제

export const deleteTransaction = async (
  userId: string,

  id: string,
) => {
  return prisma.transaction.delete({
    where: {
      id,

      userId,
    },
  });
};
