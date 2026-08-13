import { CategoryType } from './category';

export interface Transaction {
  id: string;
  type: CategoryType;
  title: string;
  amount: number;
  date: string;
  memo?: string;
  categoryId: string;
}
