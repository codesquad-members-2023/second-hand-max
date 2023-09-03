import { css, styled } from 'styled-components';

const FieldInput = styled.input`
  ${({ theme: { fonts, colors, radius } }) => css`
    width: 100%;
    border: 1px solid ${colors.neutral.border};
    border-radius: ${radius.small};
    caret-color: ${colors.accent.secondary};
    box-sizing: border-box;
    padding: 4px 12px 4px 13px;

    ${fonts.available.default16};

    &::placeholder {
      color: ${colors.neutral.textWeak};
    }
  `};
`;

export default FieldInput;
