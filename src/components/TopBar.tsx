import { css, styled } from 'styled-components';

const TopBar = styled.h1`
  ${({ theme: { colors, dimensions } }) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: ${dimensions.topBarHeight};
    width: 100%;
    border-bottom: 0.8px solid ${colors.neutral.border};
    background: ${colors.neutral.backgroundBlur};

    backdrop-filter: blur(8px);
    position: absolute;
    top: 0;
  `};
`;

export default TopBar;
