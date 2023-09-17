import Button from '@components/Button';
import { css, styled } from 'styled-components';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const DropdownMenuItem: React.FC<Props> = ({ children, onClick }) => {
  return (
    <StyledDropdownMenuItem onClick={onClick}>
      {children}
    </StyledDropdownMenuItem>
  );
};

export const StyledDropdownMenuItem = styled(Button)`
  ${({ theme: { colors, fonts } }) => css`
    width: 208px;
    padding: 16px;
    ${fonts.enabled.strong16};
    justify-content: start;
    border-radius: 0;

    &:not(:last-child) {
      border-bottom: 0.8px solid ${colors.neutral.border};
    }
  `};
`;
