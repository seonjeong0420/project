import { prisma } from "../prisma/client";

// 월별 지출 분석

export const getMonthlyAnalysis = async (
  userId: string,

  year: number,

  month: number,
) => {
  // 이번 달

  const currentStart = new Date(year, month - 1, 1);

  const currentEnd = new Date(year, month, 1);

  // 지난 달

  const previousStart = new Date(year, month - 2, 1);

  const previousEnd = new Date(year, month - 1, 1);

  const [currentTransactions, previousTransactions] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        userId,

        type: "EXPENSE",

        date: {
          gte: currentStart,
          lt: currentEnd,
        },
      },

      include: {
        category: true,
      },
    }),

    prisma.transaction.findMany({
      where: {
        userId,

        type: "EXPENSE",

        date: {
          gte: previousStart,
          lt: previousEnd,
        },
      },

      include: {
        category: true,
      },
    }),
  ]);

  const currentExpense = currentTransactions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const previousExpense = previousTransactions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const changeRate =
    previousExpense === 0
      ? 0
      : Number(
          (
            ((currentExpense - previousExpense) / previousExpense) *
            100
          ).toFixed(1),
        );

  const messages: string[] = [];

  if (changeRate > 0) {
    messages.push(`이번 달 지출이 지난 달보다 ${changeRate}% 증가했습니다.`);
  }

  if (changeRate < 0) {
    messages.push(
      `이번 달 지출이 지난 달보다 ${Math.abs(changeRate)}% 감소했습니다.`,
    );
  }

  if (changeRate === 0) {
    messages.push("이번 달 지출은 지난 달과 비슷합니다.");
  }

  // 카테고리 분석

  const currentCategory = new Map<string, number>();

  const previousCategory = new Map<string, number>();

  currentTransactions.forEach((transaction) => {
    const name = transaction.category.name;

    currentCategory.set(
      name,

      (currentCategory.get(name) || 0) + transaction.amount,
    );
  });

  previousTransactions.forEach((transaction) => {
    const name = transaction.category.name;

    previousCategory.set(
      name,

      (previousCategory.get(name) || 0) + transaction.amount,
    );
  });

  currentCategory.forEach((amount, category) => {
    const previousAmount = previousCategory.get(category) || 0;

    if (previousAmount === 0) return;

    const rate = Number(
      (((amount - previousAmount) / previousAmount) * 100).toFixed(1),
    );

    if (rate >= 10) {
      messages.push(
        `이번 달 ${category} 지출이 지난 달보다 ${rate}% 증가했습니다.`,
      );
    }
  });

  return {
    summary: {
      currentExpense,

      previousExpense,

      changeRate,
    },

    messages,
  };
};
