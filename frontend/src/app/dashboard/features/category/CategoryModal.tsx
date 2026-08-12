'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Category } from '@/types/category';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

const CategoryModal = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <Modal modalName="category">
      <h1>카테고리 관리</h1>
      <CategoryList onEdit={setSelectedCategory} />
      <CategoryForm
        category={selectedCategory}
        onSuccess={() => {
          setSelectedCategory(null);
        }}
      />
    </Modal>
  );
};

export default CategoryModal;
