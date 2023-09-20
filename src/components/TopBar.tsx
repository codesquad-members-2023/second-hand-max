import { css, styled } from 'styled-components';

const TopBar = styled.h1`
  ${({ theme: { colors, dimensions } }) => css`
    width: 100%;
    height: ${dimensions.topBarHeight};
    box-sizing: border-box;
    border-bottom: 0.8px solid ${colors.neutral.border};
    user-select: none;
    display: flex;
    align-items: center;
  `};
`;

export default TopBar;
