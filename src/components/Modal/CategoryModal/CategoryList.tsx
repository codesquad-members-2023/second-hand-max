import Button from '@components/Button';
import { Loader } from '@components/Loader';
import { useCategoryQuery } from '@hooks/queries/useCategoryQuery';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from 'stores/useModalStore';
import styled from 'styled-components';
import { Category } from 'types/category';

export const CategoryList: React.FC = () => {
  const { isLoading, data: categories } = useCategoryQuery();
  const closeCategoryModal = useModalStore(
    ({ closeCategoryModal }) => closeCategoryModal,
  );
  const navigate = useNavigate();

  const onCategoryItemClick = (categoryId: number) => {
    navigate(`/category-id/${categoryId}`);
    closeCategoryModal();
  };

  return (
    <Categories>
      {isLoading ? (
        <Loader />
      ) : (
        categories?.map((category) => {
          return (
            <CategoryItem
              key={category.id}
              {...category}
              onClick={() => onCategoryItemClick(category.id)}
            />
          );
        })
      )}
    </Categories>
  );
};

const CategoryItem: React.FC<Category & { onClick: () => void }> = ({
  imageUrl,
  name,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <CategoryItemButton>
        <StyledIcon src={imageUrl}></StyledIcon>
        <span>{name}</span>
      </CategoryItemButton>
    </li>
  );
};

const Categories = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 40px 44.5px;
  flex-grow: 1;
  overflow: scroll;
`;

const CategoryItemButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.img`
  width: 44px;
  height: 44px;
`;
