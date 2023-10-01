import { styled } from 'styled-components';
import { ProductListItem } from 'types/product';
import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import ListItem from './ListItem';

type Props = {
  queryResult: UseInfiniteQueryResult<ProductListItem[], unknown>;
};

export const ProductList: React.FC<Props> = ({
  queryResult: {
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
