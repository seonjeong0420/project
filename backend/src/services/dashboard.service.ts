import { prisma } from "../prisma/client";

export const getDashboard = async (
  userId: string,

  year: number,

  month: number,
) => {
  // 이번 달 시작

  const startDate = new Date(year, month - 1, 1);

  // 다음 달 시작

  const endDate = new Date(year, month, 1);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,

      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  let income = 0;

  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "INCOME") {
      income += transaction.amount;
    }

    if (transaction.type === "EXPENSE") {
      expense += transaction.amount;
    }
  });

  return {
    month: `${year}-${String(month).padStart(2, "0")}`,

    income,

    expense,

    balance: income - expense,

    count: transactions.length,
  };
};
