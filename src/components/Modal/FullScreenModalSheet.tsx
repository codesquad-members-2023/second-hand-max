import styled, { css } from 'styled-components';

export const FullScreenModalSheet = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    background-color: ${colors.neutral.background};
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
  `};
`;
