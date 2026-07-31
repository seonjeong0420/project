export type TransactionType = "INCOME" | "EXPENSE";

export interface CreateTransactionDto {
  title: string;

  amount: number;

  memo?: string;

  type: TransactionType;

  date: string;

  categoryId: string;
}

export interface UpdateTransactionDto {
  title?: string;

  amount?: number;

  memo?: string;

  type?: TransactionType;

  date?: string;

  categoryId?: string;
}

export interface TransactionQuery {
  type?: "INCOME" | "EXPENSE";

  keyword?: string;

  year?: string;

  month?: string;

  startDate?: string;

  endDate?: string;
}
