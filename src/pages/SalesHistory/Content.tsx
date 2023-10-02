import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import { ProductList } from '@components/ProductList';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import styled from 'styled-components';
import { SalesHistoryProductListItem } from 'types/product';

type Props = {
  salesHistoryQueryResult: UseInfiniteQueryResult<
    SalesHistoryProductListItem[],
    unknown
  >;
};

export const Content: React.FC<Props> = ({
  salesHistoryQueryResult: {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  },
}) => {
  const productListItems = useMemo(
    () => (data ? data.pages.flatMap((data) => data) : []),
    [data],
  );

  return (
    <StyledContent>
      <ProductList
        productListItems={productListItems}
        isMenuButtonAlwaysVisible
      />
      <InfiniteScrollTrigger
        {...{ hasNextPage, isFetchingNextPage, fetchNextPage }}
      />
    </StyledContent>
  );
};

const StyledContent = styled.div`
  box-sizing: border-box;
  padding-bottom: ${({ theme: { dimensions } }) => dimensions.bottomBarHeight};
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    padding: 0;
    height: 0;
  }
`;
