import { css, styled } from 'styled-components';
import Button from './Button';

export const BackButton = styled(Button)`
  ${({ theme: { fonts, colors } }) => css`
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px;
    ${fonts.available.strong16};
    color: ${colors.neutral.text};
    stroke: ${colors.neutral.text};
  `}
`;
