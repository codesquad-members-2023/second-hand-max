import { css, styled } from 'styled-components';

export const FieldCaption = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.default12};
    color: ${colors.system.warning};
    padding: 0 16px;
  `}
`;
