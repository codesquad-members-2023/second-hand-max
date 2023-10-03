import styled, { css } from 'styled-components';
import ButtonStyle from '@components/Button';
import Icons from '@design/Icons';
import { ProductDetail } from 'types/product';

type Props = Pick<ProductDetail, 'price'>;

export const LikeAndPrice: React.FC<Props> = ({ price }) => {
  return (
    <StyledLikeAndPrice>
      <LikeButton>
        <Icons.Heart />
      </LikeButton>
      <Price>
        <div>{price.toLocaleString('ko')}</div>
        <div>원</div>
      </Price>
    </StyledLikeAndPrice>
  );
};

const StyledLikeAndPrice = styled.div`
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
