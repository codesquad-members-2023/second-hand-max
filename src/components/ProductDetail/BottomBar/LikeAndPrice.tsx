import styled, { css } from 'styled-components';
import ButtonStyle from '@components/Button';
import Icons from '@design/Icons';
import { ProductDetail } from 'types/product';
import { useToggleWishlistProductMutation } from '@hooks/queries/useToggleWishlistProductMutation';

type Props = Pick<ProductDetail, 'price' | 'isInWishList'> & { itemId: string };

export const LikeAndPrice: React.FC<Props> = ({
  price,
  isInWishList,
  itemId,
}) => {
  const { mutate: toggleWishlistProduct } = useToggleWishlistProductMutation();

  return (
    <StyledLikeAndPrice>
      <LikeButton
        isInWishList={isInWishList}
        onClick={() =>
          toggleWishlistProduct({ itemId, wish: isInWishList ? 'no' : 'yes' })
        }
      >
        {isInWishList ? <Icons.HeartFilled /> : <Icons.Heart />}
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

const LikeButton = styled(ButtonStyle)<{ isInWishList: boolean }>`
  ${({ theme: { colors }, isInWishList }) => css`
    stroke: ${isInWishList ? colors.system.warning : colors.neutral.textStrong};
    fill: ${colors.system.warning};
  `}
`;

const Price = styled.div`
  display: flex;
  gap: 4px;
`;
