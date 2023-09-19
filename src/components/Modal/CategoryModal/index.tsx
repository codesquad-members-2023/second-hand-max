import { css, styled } from 'styled-components';
import { Header } from './Header';
import { CategoryList } from './CategoryList';

export const CategoryModal: React.FC = () => {
  return (
    <StyledCategoryModal>
      <Header />
      <CategoryList />
    </StyledCategoryModal>
  );
};

const StyledCategoryModal = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    background-color: ${colors.neutral.background};
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
  `};
`;
