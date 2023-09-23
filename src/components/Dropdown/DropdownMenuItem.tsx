import Button from '@components/Button';
import { css, styled } from 'styled-components';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  $isSelected: boolean;
};

export const DropdownMenuItem: React.FC<Props> = ({
  children,
  onClick,
  $isSelected,
}) => {
  return (
    <StyledDropdownMenuItem onClick={onClick} $isSelected={$isSelected}>
      {children}
    </StyledDropdownMenuItem>
  );
};

export const StyledDropdownMenuItem = styled(Button)<{ $isSelected: boolean }>`
  ${({ theme: { colors, fonts }, $isSelected }) => css`
    width: 208px;
    padding: 16px;
    ${$isSelected ? fonts.enabled.strong16 : fonts.available.default16};

    justify-content: start;
    border-radius: 0;

    &:not(:last-child) {
      border-bottom: 0.8px solid ${colors.neutral.border};
    }
  `};
`;
