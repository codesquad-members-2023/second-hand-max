import Fab from '@components/Fab';
import { ProductList } from '@components/ProductList';
import { styled } from 'styled-components';
import { TopBar } from './TopBar';
import { useUserStore } from 'stores/useUserStore';
import { useParams } from 'react-router-dom';
import { useProductQuery } from '@hooks/queries/useProductQuery';
import { Loader } from '@components/Loader';
import { useModalStore } from 'stores/useModalStore';

export const Home: React.FC = () => {
  const openNewProductModal = useModalStore(
    ({ openNewProductModal }) => openNewProductModal,
  );
  const user = useUserStore(({ user }) => user);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );
  const { categoryId } = useParams();

  const { isLoading, data: productListItems } = useProductQuery(
    '역삼', // TODO: 실제 currentRegion 가져와서 넣기.
    categoryId,
  );

  console.log(productListItems);

  return (
    <>
      <TopBar />
      <Content>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductList productListItems={productListItems} />
        )}
        <Fab onClick={openNewProductModal} />
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
