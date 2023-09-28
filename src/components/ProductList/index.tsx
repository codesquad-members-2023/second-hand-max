import { styled } from 'styled-components';
import ListItem from './ListItem';
import { ProductListItem } from 'types/product';
import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import { UseInfiniteQueryResult } from '@tanstack/react-query';

type Props = {
  productQuery: UseInfiniteQueryResult<ProductListItem[], unknown>;
};

export const ProductList: React.FC<Props> = ({
  productQuery: {
    data: productListItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  },
}) => {
  return (
    <>
      <ProductListItems>
        {productListItems?.pages.map((page) =>
          page.map((product) => <ListItem key={product.itemId} {...product} />),
        )}
      </ProductListItems>
      <InfiniteScrollTrigger
        {...{ hasNextPage, isFetchingNextPage, fetchNextPage }}
      />
    </>
  );
};

const ProductListItems = styled.ul`
  padding: 0 16px;
`;
