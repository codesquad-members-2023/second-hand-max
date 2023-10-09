import Fab from '@components/Fab';
import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import { Loader } from '@components/Loader';
import { ProductList } from '@components/ProductList';
import { useProductInfiniteQuery } from '@hooks/queries/useProductInfiniteQuery';
import { useFlattenPages } from '@hooks/useFlattenPages';
import { useParams } from 'react-router-dom';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';
import styled from 'styled-components';

export const Content: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const openPostProductModal = useModalStore(
    ({ openPostProductModal }) => openPostProductModal,
  );
  const { categoryId } = useParams();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useProductInfiniteQuery(currentRegion.addressName, categoryId);
  const productListItems = useFlattenPages(data);

  return (
    <StyledContent>
      {isLoading && <Loader />}
      {productListItems && (
        <>
          <ProductList productListItems={productListItems} />
          <InfiniteScrollTrigger
            {...{ hasNextPage, isFetchingNextPage, fetchNextPage }}
          />
          {!isFetchingNextPage && !hasNextPage && (
            <EndOfListMessage>더 이상 상품이 없습니다!</EndOfListMessage>
          )}
        </>
      )}
      <Fab onClick={openPostProductModal} />
    </StyledContent>
  );
};

const StyledContent = styled.div`
  box-sizing: border-box;
  padding-top: ${({ theme: { dimensions } }) => dimensions.topBarHeight};
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    padding: 0;
    height: 0;
  }
`;

const EndOfListMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
`;
