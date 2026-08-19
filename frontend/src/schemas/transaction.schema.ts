import z from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE'], {
    message: '거래 타입은 필수입니다.',
  }),
  title: z.string().min(1, '거래 제목은 필수입니다.'),
  categoryId: z.string().min(1, '카테고리는 필수입니다.'),
  amount: z.number().min(1, '금액은 필수입니다.'),
  memo: z.string().optional(),
});

export type TransactionFormValuesSchema = z.infer<typeof transactionSchema>;
