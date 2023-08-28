import { css, styled } from 'styled-components';

const BottomBar = styled.div`
  ${({ theme: { colors, dimensions } }) => css`
    height: ${dimensions.bottomBarHeight};
    border-top: 0.8px solid ${colors.neutral.border};
    background: ${colors.neutral.background};
    box-sizing: border-box;

    display: flex;
    align-items: center;
    flex-shrink: 0;
  `}
`;

export default BottomBar;
