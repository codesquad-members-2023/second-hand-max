import TopBar from '@components/TopBar';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useWishlistInfiniteQuery } from '@hooks/queries/useWishlistInfiniteQuery';
import { ProductList } from '@components/ProductList';
import { CategoryTabs } from './CategoryTabs';
import { useWishlistCategoryQuery } from '@hooks/queries/useWishlistCategoryQuery';
import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';

export const ALL_CATEGORY_ID = 0;

export const Wishlist: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number>(ALL_CATEGORY_ID);
  const { data: categories } = useWishlistCategoryQuery();
  const {
    data: productListItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useWishlistInfiniteQuery(selectedCategoryId);

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

      {productListItems && (
        <>
          <ProductList
            productListItems={productListItems.pages}
            isMenuButtonAlwaysVisible
          />
          <InfiniteScrollTrigger
            {...{ hasNextPage, isFetchingNextPage, fetchNextPage }}
          />
        </>
      )}
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  margin-bottom: 16px;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;
