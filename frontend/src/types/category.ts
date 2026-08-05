export interface Category {
  type: 'EXPENSE' | 'INCOME';
  name: string;
  icon?: string;
  color?: string;
}
