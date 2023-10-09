import { useCategoryQuery } from '@hooks/queries/useCategoryQuery';
import { Modal } from '../ModalSheet';
import { CategoryListModalHeader } from './CategoryListModalHeader';
import { Loader } from '@components/Loader';
import { CategoryList } from './CategoryList';
import { usePostProductModalStore } from '../PostProductModal/usePostProductModalStore';

export const CategoryListModal: React.FC = () => {
  const { isLoading, withoutPopularCategories: categories } =
    useCategoryQuery();

  const closeCategoryListModal = usePostProductModalStore(
    ({ closeCategoryListModal }) => closeCategoryListModal,
  );

  return (
    <Modal
      modalSheetStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CategoryListModalHeader onModalClose={closeCategoryListModal} />
      {isLoading ? (
        <Loader />
      ) : (
        categories && <CategoryList categories={categories} />
      )}
    </Modal>
  );
};
