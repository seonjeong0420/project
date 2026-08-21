import { prisma } from '../prisma/client';
import { TransactionQuery } from '../types/transaction';
import { CreateTransactionDto, UpdateTransactionDto } from '../types/transaction';

// 목록 조회
export const getTransactions = async (userId: string, params: TransactionQuery) => {
  const { page = 1, limit = 10, year, month, type, categoryId, keyword, startDate, endDate } = params;

  const skip = (page - 1) * limit;

  const where = {
    userId,

    ...(type && {
      type,
    }),

    ...(categoryId && {
      categoryId,
    }),

    ...(keyword && {
      OR: [
        {
          title: {
            contains: keyword,
            mode: 'insensitive' as const,
          },
        },
        {
          memo: {
            contains: keyword,
            mode: 'insensitive' as const,
          },
        },
      ],
    }),

    ...(startDate && endDate
      ? {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }
      : year && month
        ? {
            date: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          }
        : {}),
  };

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,

      include: {
        category: true,
      },

      orderBy: {
        date: 'desc',
      },

      skip,
      take: limit,
    }),

    prisma.transaction.count({
      where,
    }),
  ]);

  return {
    data: transactions,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
    throw new Error('카테고리를 찾을 수 없습니다.');
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
