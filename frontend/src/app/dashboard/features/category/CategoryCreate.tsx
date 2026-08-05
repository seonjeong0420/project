'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryCreate } from '@/hooks/useCategory';
import { CategoryFormValues, categorySchema } from '@/schemas/category.schema';

const CategoryCreate = () => {
  const categoryMutation = useCategoryCreate();
  const { handleSubmit, register, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: 'INCOME',
      name: '',
      icon: '',
      color: '#000000',
    },
  });
  const onSubmit = (data: CategoryFormValues) => {
    categoryMutation.mutate(data, {
      onSuccess() {
        reset();
      },
      onError(error) {
        console.log('카테고리 생성 실패', error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>카테고리 추가</legend>
        <ul>
          <li>
            <label htmlFor="categoryType">카테고리 타입</label>
            <select id="categoryType" {...register('type')}>
              <option value="INCOME">수입</option>
              <option value="EXPENSE">지출</option>
            </select>
          </li>
          <li>
            <label htmlFor="categoryName">카테고리 이름</label>
            <input type="text" id="categoryName" {...register('name')} />
          </li>
          <li>
            <label htmlFor="categoryIcon">카테고리 아이콘</label>
            <input type="text" id="categoryIcon" {...register('icon')} />
          </li>
          <li>
            <label htmlFor="categoryColor">카테고리 컬러값</label>
            <input type="color" id="categoryColor" {...register('color')} />
          </li>
        </ul>
        <button type="submit">추가</button>
      </fieldset>
    </form>
  );
};

export default CategoryCreate;
