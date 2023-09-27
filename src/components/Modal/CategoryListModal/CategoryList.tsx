import Button from '@components/Button';
import styled, { css } from 'styled-components';
import { Category } from 'types/category';
import { usePostProductModalStore } from '../PostProductModal/usePostProductModalStore';

type Props = {
  categories: Category[];
};

export const CategoryList: React.FC<Props> = ({ categories }) => {
  const setSelectCategory = usePostProductModalStore(
    ({ setSelectCategory }) => setSelectCategory,
  );
  const closeCategoryListModal = usePostProductModalStore(
    ({ closeCategoryListModal }) => closeCategoryListModal,
  );

  return (
    <Categories>
      {categories.map((category) => (
        <CategoryItem key={category.id}>
          <CategoryButton
            onClick={() => {
              setSelectCategory(category);
              closeCategoryListModal();
            }}
          >
            {category.name}
          </CategoryButton>
        </CategoryItem>
      ))}
    </Categories>
  );
};

const Categories = styled.ul`
  padding: 0 24px;
  flex-grow: 1;
  overflow: scroll;
`;

const CategoryItem = styled.li`
  ${({ theme: { colors } }) => css`
    &:not(:last-child) {
      border-bottom: 0.8px solid ${colors.neutral.border};
    }
  `}
`;

const CategoryButton = styled(Button)`
  ${({ theme: { fonts, colors } }) => css`
    width: 100%;
    padding: 16px 0;
    justify-content: start;

    ${fonts.available.default16};
    color: ${colors.neutral.text};
  `}
`;
