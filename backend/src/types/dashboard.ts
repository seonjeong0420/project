import { TransactionType } from '@prisma/client';

export interface DashboardSummaryTransaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: Date;
  memo: string | null;
  category: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  } | null;
}

export interface DashboardSummary {
  income: number;
  expense: number;
  balance: number;
  recentTransactions: DashboardSummaryTransaction[];
}
