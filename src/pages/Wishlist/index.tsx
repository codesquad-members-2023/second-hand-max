import TopBar from '@components/TopBar';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useWishlistQuery } from '@hooks/queries/useWishlistQuery';
import { ProductList } from '@components/ProductList';
import { CategoryTabs } from './CategoryTabs';
import { useWishlistCategoryQuery } from '@hooks/queries/useWishlistCategoryQuery';

export const ALL_CATEGORY_ID = 0;

export const Wishlist: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number>(ALL_CATEGORY_ID);
  const { data: categories } = useWishlistCategoryQuery();
  const wishlistQueryResult = useWishlistQuery(selectedCategoryId);

  const onCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <Title aria-label="판매내역">관심상품</Title>

      <CategoryTabs
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={onCategorySelect}
      />

      <ProductList queryResult={wishlistQueryResult} />
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  margin-bottom: 16px;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;
