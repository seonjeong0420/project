export interface Category {
  id?: string;
  type: 'EXPENSE' | 'INCOME';
  name: string;
  icon?: string;
  color?: string;
}
