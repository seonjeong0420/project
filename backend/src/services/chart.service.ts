import { prisma } from "../prisma/client";

// 월별 소비
export const getMonthlyChart = async (userId: string, year: number) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,

      type: "EXPENSE",

      date: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
  });

  const monthly = Array.from({ length: 12 }, () => 0);

  transactions.forEach((transaction) => {
    const month = transaction.date.getMonth();

    monthly[month] += transaction.amount;
  });

  return monthly.map((amount, index) => ({
    month: `${index + 1}월`,

    amount,
  }));
};

// 카테고리별 소비

export const getCategoryChart = async (
  userId: string,

  year: number,

  month: number,
) => {
  const start = new Date(year, month - 1, 1);

  const end = new Date(year, month, 1);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,

      type: "EXPENSE",

      date: {
        gte: start,
        lt: end,
      },
    },

    include: {
      category: true,
    },
  });

  const result = new Map<string, number>();

  transactions.forEach((transaction) => {
    const name = transaction.category.name;

    result.set(name, (result.get(name) || 0) + transaction.amount);
  });

  return Array.from(result.entries()).map(([category, amount]) => ({
    category,

    amount,
  }));
};

// 일별 소비

export const getDailyChart = async (
  userId: string,

  year: number,

  month: number,
) => {
  const start = new Date(year, month - 1, 1);

  const end = new Date(year, month, 1);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,

      type: "EXPENSE",

      date: {
        gte: start,
        lt: end,
      },
    },
  });

  const daily = new Map<string, number>();

  transactions.forEach((transaction) => {
    const date = transaction.date.toISOString().slice(0, 10);

    daily.set(date, (daily.get(date) || 0) + transaction.amount);
  });

  return Array.from(daily.entries()).map(([date, amount]) => ({
    date,

    amount,
  }));
};
