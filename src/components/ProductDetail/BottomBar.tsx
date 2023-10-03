import BottomBarStyle from '@components/BottomBar';
import ButtonStyle from '@components/Button';
import Icons from '@design/Icons';
import styled, { css } from 'styled-components';
import { ProductDetail } from 'types/product';

type Props = Pick<ProductDetail, 'price' | 'isSeller'>;

export const BottomBar: React.FC<Props> = ({ price, isSeller }) => {
  return (
    <Container>
      <LikeAndPrice>
        <LikeButton>
          <Icons.Heart />
        </LikeButton>
        <Price>
          <div>{price?.toLocaleString('ko') ?? 0}</div>
          <div>원</div>
        </Price>
      </LikeAndPrice>
      {isSeller ? (
        <Button $flexible="Flexible" $type="Contained">
          대화 중인 채팅방
        </Button>
      ) : (
        <Button $flexible="Flexible" $type="Contained">
          채팅하기
        </Button>
      )}
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
`;

const LikeButton = styled(ButtonStyle)`
  ${({ theme: { colors } }) => css`
    stroke: ${colors.neutral.textStrong};
  `}
`;

const Price = styled.div`
  display: flex;
  gap: 4px;
`;

const Button = styled(ButtonStyle)`
  padding: 8px 16px;
  ${({ theme: { fonts } }) => fonts.available.strong12};
`;
