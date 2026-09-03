import { Transaction } from './transaction';

export interface DashboardSummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
  count: number;
  recentTransactions: Transaction[];
}
