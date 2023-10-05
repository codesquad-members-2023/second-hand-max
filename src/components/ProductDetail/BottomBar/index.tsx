import BottomBarStyle from '@components/BottomBar';
import styled from 'styled-components';
import { ProductDetail } from 'types/product';
import { LikeAndPrice } from './LikeAndPrice';
import { ChatButton } from './ChatButton';

type Props = Pick<
  ProductDetail,
  'title' | 'price' | 'seller' | 'isSeller' | 'isInWishList'
> & {
  thumbnailUrl: string;
  itemId: string;
  chatRoomCount?: number;
  chatRoomId?: number | null;
};

export const BottomBar: React.FC<Props> = ({
  title,
  thumbnailUrl,
  price,
  seller,
  isSeller,
  isInWishList,
  itemId,
  chatRoomCount,
  chatRoomId,
}) => {
  return (
    <Container>
      <LikeAndPrice price={price} isInWishList={isInWishList} itemId={itemId} />
      <ChatButton
        title={title}
        thumbnailUrl={thumbnailUrl}
        price={price}
        seller={seller}
        isSeller={isSeller}
        itemId={itemId}
        chatRoomCount={chatRoomCount}
        chatRoomId={chatRoomId}
      />
    </Container>
  );
};

const Container = styled(BottomBarStyle)`
  width: 100%;
  padding: 16px;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;
