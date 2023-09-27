import styled, { css } from 'styled-components';
import { usePostProductModalStore } from '../usePostProductModalStore';
import { useCategoryQuery } from '@hooks/queries/useCategoryQuery';
import { Tag } from '@components/Tag';
import Icons from '@design/Icons';
import { CategoryListModal } from '@components/Modal/CategoryListModal';

const EXAMPLE_CATEGORY_MAX_COUNT = 3;

export const CategorySelector: React.FC = () => {
  const title = usePostProductModalStore(({ title }) => title);
  const selectCategory = usePostProductModalStore(
    ({ selectCategory }) => selectCategory,
  );
  const setSelectCategory = usePostProductModalStore(
    ({ setSelectCategory }) => setSelectCategory,
  );
  const isCategoryListModalOpen = usePostProductModalStore(
    ({ isCategoryListModalOpen }) => isCategoryListModalOpen,
  );
  const openCategoryListModal = usePostProductModalStore(
    ({ openCategoryListModal }) => openCategoryListModal,
  );

  const { withoutPopularCategories: categories } = useCategoryQuery();

  const exampleCategories = (
    categories && selectCategory
      ? [...new Set([selectCategory, ...categories])]
      : categories
  )?.slice(0, EXAMPLE_CATEGORY_MAX_COUNT);

  return (
    <>
      {title && (
        <CategoryContainer>
          <Tags>
            {exampleCategories?.map((category) => (
              <Tag
                key={category.id}
                title={category.name}
                isSelected={selectCategory?.id === category.id}
                onClick={() => setSelectCategory(category)}
              />
            ))}
          </Tags>
          <Icons.ChevronRight onClick={openCategoryListModal} />
          {isCategoryListModalOpen && <CategoryListModal />}
        </CategoryContainer>
      )}
    </>
  );
};

const Tags = styled.div`
  display: flex;
  gap: 4px;
`;

const CategoryContainer = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
      stroke: ${colors.neutral.text};
      cursor: pointer;
    }
  `};
`;
