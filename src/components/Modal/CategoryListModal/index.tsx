import { useCategoryQuery } from '@hooks/queries/useCategoryQuery';
import { Modal } from '../ModalSheet';
import { CategoryListModalHeader } from './CategoryListModalHeader';
import { Loader } from '@components/Loader';
import { CategoryList } from './CategoryList';
import { Category } from 'types/category';

type Props = {
  closeCategoryListModalOpen: () => void;
  categoryListSelect: (category: Category) => void;
};

export const CategoryListModal: React.FC<Props> = ({
  closeCategoryListModalOpen,
  categoryListSelect,
}) => {
  const { isLoading, withoutPopularCategories: categories } =
    useCategoryQuery();

  return (
    <Modal
      modalSheetStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CategoryListModalHeader
        {...{ onModalClose: closeCategoryListModalOpen }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        categories && (
          <CategoryList {...{ categories, onClick: categoryListSelect }} />
        )
      )}
    </Modal>
  );
};
