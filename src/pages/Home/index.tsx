import Fab from '@components/Fab';
import { ProductList } from '@components/ProductList';
import { styled } from 'styled-components';
import { TopBar } from './TopBar';
import { useUserStore } from 'stores/useUserStore';
import { useParams } from 'react-router-dom';
import { useProductInfiniteQuery } from '@hooks/queries/useProductInfiniteQuery';
import { Loader } from '@components/Loader';
import { useModalStore } from 'stores/useModalStore';

export const Home: React.FC = () => {
  const openPostProductModal = useModalStore(
    ({ openPostProductModal }) => openPostProductModal,
  );
  const user = useUserStore(({ user }) => user);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );
  const { categoryId } = useParams();

  const { isLoading, data: productListItems } = useProductInfiniteQuery(
    '역삼', // TODO: 실제 currentRegion 가져와서 넣기.
    categoryId,
  );

  return (
    <>
      <TopBar />
      <Content>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductList productListItems={productListItems} />
        )}
        <Fab onClick={openPostProductModal} />
      </Content>
    </>
  );
};

const Content = styled.div`
  box-sizing: border-box;
  padding: 16px;
  padding-top: ${({ theme: { dimensions } }) => dimensions.topBarHeight};
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    padding: 0;
    height: 0;
  }
`;
