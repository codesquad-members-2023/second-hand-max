import BottomBarStyle from '@components/BottomBar';
import ButtonStyle from '@components/Button';
import Icons from '@design/Icons';
import styled from 'styled-components';
import { ProductDetail } from 'types/product';

export const BottomBar: React.FC<Pick<ProductDetail, 'price'>> = ({
  price,
}) => {
  return (
    <Container>
      <LikeAndPrice>
        <Icons.Heart />
        <Price>
          <div>{price.toLocaleString('ko')}</div>
          <div>원</div>
        </Price>
      </LikeAndPrice>
      <Button $flexible="Flexible" $type="Contained">
        대화 중인 채팅방
      </Button>
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

const LikeAndPrice = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  stroke: ${({ theme: { colors } }) => colors.neutral.textStrong};
`;

const Price = styled.div`
  display: flex;
  gap: 4px;
`;

const Button = styled(ButtonStyle)`
  padding: 8px 16px;
  ${({ theme: { fonts } }) => fonts.available.strong12};
`;
