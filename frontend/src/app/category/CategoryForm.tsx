import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryCreate, useCategoryUpdate } from '@/hooks/useCategory';
import { CategoryFormValuesSchema, categorySchema } from '@/schemas/category.schema';
import { Category, CategoryFormValues } from '@/types/category';

type Props = {
  category?: Category | null;
  onSuccess?: () => void;
};

const CategoryForm = ({ category, onSuccess }: Props) => {
  const isEdit = !!category;
  const categoryCreate = useCategoryCreate();
  const categoryUpdate = useCategoryUpdate();
  const isPending = categoryCreate.isPending || categoryUpdate.isPending;

  const { handleSubmit, register, reset } = useForm<CategoryFormValuesSchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: 'INCOME',
      name: '',
      icon: '',
      color: '#000000',
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    if (isEdit && category) {
      categoryUpdate.mutate(
        {
          id: category.id,
          data,
        },
        {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
        },
      );

      return;
    } else {
      categoryCreate.mutate(data, {
        onSuccess() {
          reset();
          onSuccess?.();
        },
        onError(error) {
          console.log('카테고리 생성 실패', error);
        },
      });
    }
  };

  useEffect(() => {
    if (category) {
      reset({
        type: category.type,
        name: category.name,
        icon: category.icon,
        color: category.color,
      });
    } else {
      reset({
        type: 'INCOME',
        name: '',
        icon: '',
        color: '#000000',
      });
    }
  }, [category, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>{isEdit ? '카테고리 수정' : '카테고리 추가'}</legend>
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
        <button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : isEdit ? '수정' : '추가'}
        </button>
      </fieldset>
    </form>
  );
};

export default CategoryForm;
