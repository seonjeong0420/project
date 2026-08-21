export type TransactionType = 'INCOME' | 'EXPENSE';

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
  page?: number;
  limit?: number;

  type?: 'INCOME' | 'EXPENSE';

  categoryId?: string;

  keyword?: string;

  year?: number;

  month?: number;

  startDate?: string;

  endDate?: string;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
