import { ButtonHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';

type Props = {
  $flexible?: 'Flexible' | 'Fixed';
  $type?: 'Contained' | 'Outline' | 'Ghost';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = styled.button<Props>`
  ${({ theme: { colors, radius, opacity }, $flexible, $type }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: ${radius.medium};
    box-sizing: border-box;

    &:hover {
      opacity: ${opacity.hover};
    }

    &:active {
      opacity: ${opacity.press};
    }

    &:disabled {
      opacity: ${opacity.disabled};
    }

    ${$flexible === 'Flexible'
      ? css`
          padding: 16px 24px;
        `
      : css`
          padding: 16px 0px;
        `}

    ${$type === 'Contained'
      ? css`
          background-color: ${colors.accent.primary};
          color: ${colors.accent.text};
        `
      : $type === 'Outline'
      ? css`
          background-color: ${colors.neutral.background};
          color: ${colors.accent.textWeak};
          border: 1px solid ${colors.neutral.border};
        `
      : $type === 'Ghost'
      ? css`
          color: ${colors.accent.textWeak};
        `
      : null};
  `}
`;

export default Button;
