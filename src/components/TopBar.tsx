import { css, styled } from 'styled-components';

const TopBar = styled.h1`
  ${({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 56px;
    width: 100%;
    border-bottom: 0.8px solid ${colors.neutral.border};
    background: ${colors.neutral.backgroundBlur};

    backdrop-filter: blur(8px);
    position: absolute;
    top: 0;
  `};
`;

export default TopBar;
