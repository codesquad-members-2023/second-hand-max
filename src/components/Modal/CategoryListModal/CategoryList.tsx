import Button from '@components/Button';
import styled, { css } from 'styled-components';
import { Category } from 'types/category';

type Props = {
  categories: Category[];
  onClick: (category: Category) => void;
};

export const CategoryList: React.FC<Props> = ({ categories, onClick }) => {
  return (
    <Categories>
      {categories.map((category) => (
        <CategoryItem key={category.id}>
          <CategoryButton onClick={() => onClick(category)}>
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
