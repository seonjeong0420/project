export type CategoryType = 'EXPENSE' | 'INCOME';

export interface Category {
  id: string;
  type: CategoryType;
  name: string;
  icon?: string;
  color?: string;
}

export type CategoryFormValues = {
  type: CategoryType;
  name: string;
  icon?: string;
  color?: string;
};
