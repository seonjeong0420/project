import z from 'zod';

export const categorySchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE'], {
    message: '카테고리 타입은 필수입니다.',
  }),
  name: z.string().min(1, '카테고리 이름은 필수입니다.'),
  icon: z.string().min(1, '카테고리 아이콘은 필수입니다.'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '올바른 색상 코드를 입력해주세요.'),
});

export type CategoryFormValuesSchema = z.infer<typeof categorySchema>;
