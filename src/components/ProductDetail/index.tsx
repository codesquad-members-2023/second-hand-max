import { css, styled } from 'styled-components';
import { TopBar } from './TopBar';
import Visual from './Visual';
import Content from './Content';
import { Route, Routes, useParams } from 'react-router-dom';
import { useProductDetailQuery } from '@hooks/queries/useProductDetailQuery';
import { Loader } from '@components/Loader';
import { ErrorPage } from '@pages/ErrorPage';
import { BottomBar } from './BottomBar';
import { ProductChatList } from './ProductChatList';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useProductDetailQuery(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !id) {
    return <ErrorPage onClick={refetch} />;
  }

  return (
    <Container>
      <TopBar itemId={id} isSeller={data.isSeller} />
      <Visual imageUrls={data.imageUrls} />
      <Content data={data} itemId={id} />
      <BottomBar
        title={data.title}
        thumbnailUrl={data.imageUrls[0]!}
        price={data.price}
        seller={data.seller}
        isSeller={data.isSeller}
        isInWishList={data.isInWishList}
        chatRoomCount={data.isSeller ? data.chatCount : undefined}
        chatRoomId={data.isSeller ? undefined : data.chatRoomId}
        itemId={id}
      />

      <Routes>
        <Route path={'/chats'} element={<ProductChatList />} />
      </Routes>
    </Container>
  );
};

const Container = styled.article`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${colors.neutral.background};
    overflow: auto;
    display: flex;
    flex-direction: column;
  `}
`;

export default ProductDetail;
