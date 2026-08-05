import Modal from '@/components/ui/Modal';
import CategoryCreate from './CategoryCreate';
import CategoryList from './CategoryList';

const CategoryModal = () => {
  return (
    <Modal modalName="category">
      <h1>카테고리 관리</h1>
      <CategoryList />
      <CategoryCreate />
    </Modal>
  );
};

export default CategoryModal;
