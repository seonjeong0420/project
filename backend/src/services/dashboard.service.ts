import { prisma } from '../prisma/client';

export const getDashboard = async (userId: string, year: number, month: number) => {
  // 이번 달 시작
  const startDate = new Date(year, month - 1, 1);

  // 다음 달 시작
  const endDate = new Date(year, month, 1);

  const [transactions, recentTransactions] = await Promise.all([
    // 이번 달 전체 거래
    prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    }),

    // 최근 내역 5개
    prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    }),
  ]);

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);

    if (transaction.type === 'INCOME') {
      income += amount;
    }

    if (transaction.type === 'EXPENSE') {
      expense += amount;
    }
  });

  return {
    month: `${year}-${String(month).padStart(2, '0')}`,

    income,

    expense,

    balance: income - expense,

    count: transactions.length,

    recentTransactions: recentTransactions.map((transaction) => ({
      id: transaction.id,
      type: transaction.type,
      title: transaction.title,
      amount: Number(transaction.amount),
      date: transaction.date,
      memo: transaction.memo,
      category: transaction.category
        ? {
            id: transaction.category.id,
            name: transaction.category.name,
            icon: transaction.category.icon,
            color: transaction.category.color,
          }
        : null,
    })),
  };
};
