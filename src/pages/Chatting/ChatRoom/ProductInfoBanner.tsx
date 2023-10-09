import styled, { css } from 'styled-components';

type Props = {
  title: string;
  thumbnailUrl: string;
  price: number;
};

export const ProductInfoBanner: React.FC<Props> = ({
  title,
  thumbnailUrl,
  price,
}) => {
  return (
    <StyledProductInfoBanner>
      <ProductImage src={thumbnailUrl} />
      <ProductInfo>
        <div>{title}</div>
        <ProductPrice>
          {price === 0 || price === null
            ? '나눔'
            : `${price.toLocaleString('ko')}원`}
        </ProductPrice>
      </ProductInfo>
    </StyledProductInfoBanner>
  );
};

const StyledProductInfoBanner = styled.div`
  ${({ theme: { colors } }) => css`
    padding: 16px;
    border-bottom: 0.8px solid ${colors.neutral.border};
    display: flex;
    gap: 8px;
  `};
`;

const ProductImage = styled.img`
  ${({ theme: { colors, radius } }) => css`
    width: 48px;
    height: 48px;
    border: 0.8px solid ${colors.neutral.border};
    border-radius: ${radius.small};
    box-sizing: border-box;
  `};
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductPrice = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.strong16};
    color: ${colors.neutral.text};
  `};
`;
