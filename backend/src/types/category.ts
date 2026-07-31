export type CategoryType = "INCOME" | "EXPENSE";

export interface CreateCategoryDto {
  name: string;

  type: CategoryType;

  icon?: string;

  color?: string;
}

export interface UpdateCategoryDto {
  name?: string;

  type?: CategoryType;

  icon?: string;

  color?: string;
}
