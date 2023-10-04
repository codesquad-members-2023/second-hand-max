import styled, { css } from 'styled-components';

export const ProductInfoBanner: React.FC = () => {
  return (
    <StyledProductInfoBanner>
      <ProductImage />
      <ProductInfo>
        <div>빈티지 롤러 스케이트</div>
        <ProductPrice>169,000원</ProductPrice>
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
