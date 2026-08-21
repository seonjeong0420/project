import { CategoryType } from './category';

export interface TransactionBase {
  type: CategoryType;
  title: string;
  amount: number;
  date: string;
  categoryId: string;
  memo?: string;
}

export interface Transaction extends TransactionBase {
  id: string;
}

export type TransactionCreate = Omit<Transaction, 'id'>;

export interface TransactionListParams {
  page?: number;
  limit?: number;
  type?: CategoryType;
  categoryId?: string;
  keyword?: string;
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
}

export interface TransactionPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionListResponse {
  data: Transaction[];
  pagination: TransactionPagination;
}
