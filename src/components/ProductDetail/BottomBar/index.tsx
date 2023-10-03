import BottomBarStyle from '@components/BottomBar';
import styled from 'styled-components';
import { ProductDetail } from 'types/product';
import { LikeAndPrice } from './LikeAndPrice';
import { ChatButton } from './ChatButton';

type Props = Pick<ProductDetail, 'price' | 'isSeller'>;

export const BottomBar: React.FC<Props> = ({ price, isSeller }) => {
  return (
    <Container>
      <LikeAndPrice price={price} />
      <ChatButton isSeller={isSeller} />
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
