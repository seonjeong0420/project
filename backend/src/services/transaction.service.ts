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

    // 날짜 검색
    ...(startDate && endDate
      ? (() => {
          const start = new Date(startDate);
          const end = new Date(endDate);

          // endDate 하루 전체를 포함하기 위해 +1일
          end.setDate(end.getDate() + 1);

          return {
            date: {
              gte: start,
              lt: end,
            },
          };
        })()
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

// 캘린더에서 사용하기 위한 날짜별 목록 조회
export const getCalendarTransactions = async (userId: string, year: number, month: number) => {
  const start = new Date(year, month - 1, 1);

  const end = new Date(year, month, 1);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lt: end,
      },
    },
    select: {
      date: true,
      type: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  const summary = new Map<
    string,
    {
      incomeCount: number;
      expenseCount: number;
    }
  >();

  transactions.forEach((transaction) => {
    const date = transaction.date.toISOString().slice(0, 10);

    if (!summary.has(date)) {
      summary.set(date, {
        incomeCount: 0,
        expenseCount: 0,
      });
    }

    const current = summary.get(date)!;

    if (transaction.type === 'INCOME') {
      current.incomeCount += 1;
    }

    if (transaction.type === 'EXPENSE') {
      current.expenseCount += 1;
    }
  });

  return Array.from(summary.entries()).map(([date, count]) => ({
    date,
    incomeCount: count.incomeCount,
    expenseCount: count.expenseCount,
  }));
};

// 캘린더에 날짜별 조회
export const getTransactionsByDate = async (userId: string, date: string) => {
  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T00:00:00`);

  end.setDate(end.getDate() + 1);

  return prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lt: end,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      date: 'asc',
    },
  });
};
