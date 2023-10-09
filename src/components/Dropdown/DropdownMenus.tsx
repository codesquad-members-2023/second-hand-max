import { css, styled } from 'styled-components';
import { useDropdownContext } from './useDropdownContext';

type AlignDirection = 'left' | 'right';

type Props = {
  children: React.ReactNode;
  alignDirection?: AlignDirection;
};

export const DropdownMenus: React.FC<Props> = ({
  children,
  alignDirection = 'left',
}) => {
  const { closeDropdown } = useDropdownContext();

  return (
    <StyledDropdownMenus $alignDirection={alignDirection}>
      <Box>{children}</Box>
      <Overlay onClick={closeDropdown} />
    </StyledDropdownMenus>
  );
};

const StyledDropdownMenus = styled.div<{ $alignDirection: AlignDirection }>`
  position: absolute;
  top: 100%;
  ${({ $alignDirection }) => $alignDirection}: 0;
  user-select: none;
`;

const Box = styled.div`
  ${({ theme: { colors, radius } }) => css`
    background-color: ${colors.neutral.background};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: ${radius.medium};
    position: relative;
    z-index: 3;
    box-sizing: border-box;
    overflow: hidden;
  `}
`;

const Overlay = styled.button`
  ${({ theme: { colors } }) => css`
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: ${colors.neutral.overlay};
    position: fixed;
    top: 0;
    left: 0;
  `}
`;
