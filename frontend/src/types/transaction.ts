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

export type TransactionList = Transaction;
