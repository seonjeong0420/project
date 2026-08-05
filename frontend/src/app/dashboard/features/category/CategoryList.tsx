'use client';
import { useCategoryList } from '@/hooks/useCategory';

const CategoryList = () => {
  const { data } = useCategoryList();

  return (
    <div>
      {data?.map(category => (
        <div key={category.name}>{category.name}</div>
      ))}
    </div>
  );
};

export default CategoryList;
