'use client';

import { useCategoryDelete, useCategoryList, useCategoryUpdate } from '@/hooks/useCategory';
import { Category } from '@/types/category';

type Props = {
  onEdit: (category: Category) => void;
};

const CategoryList = ({ onEdit }: Props) => {
  const { data } = useCategoryList();
  const categoryDelete = useCategoryDelete();
  const handleDeleteCategory = (id: string) => {
    categoryDelete.mutate(id);
  };

  return (
    <div>
      {data?.map(category => (
        <ul key={category.id}>
          <li>{category.type}</li>
          <li>{category.name}</li>
          <li>{category.icon}</li>
          <li>{category.color}</li>
          <li>
            <button onClick={() => handleDeleteCategory(category.id)}>삭제</button>
          </li>
          <li>
            <button onClick={() => onEdit(category)}>수정</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryList;
