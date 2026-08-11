'use client';
import { useCategoryDelete, useCategoryList } from '@/hooks/useCategory';

const CategoryList = () => {
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
            <button onClick={() => handleDeleteCategory(category.id!!)}>삭제</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryList;
