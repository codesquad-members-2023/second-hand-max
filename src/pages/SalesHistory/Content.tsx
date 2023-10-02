import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import { ProductList } from '@components/ProductList';
import { useFlattenPages } from '@hooks/useFlattenPages';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import styled from 'styled-components';
import { SalesHistoryProductListItem } from 'types/product';

type Props = {
  salesHistoryQueryResult: UseInfiniteQueryResult<
    SalesHistoryProductListItem[],
    unknown
  >;
};

export const Content: React.FC<Props> = ({ salesHistoryQueryResult }) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    salesHistoryQueryResult;
  const productListItems = useFlattenPages(data);

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
