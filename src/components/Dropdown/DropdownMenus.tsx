import { css, styled } from 'styled-components';
import { useDropdownContext } from './useDropdownContext';

type Props = {
  children: React.ReactNode;
};

export const DropdownMenus: React.FC<Props> = ({ children }) => {
  const { isDropdownOpen, closeDropdown } = useDropdownContext();

  if (!isDropdownOpen) {
    return null;
  }

  return (
    <StyledDropdownMenus>
      <Box>{children}</Box>
      <Overlay onClick={closeDropdown} />
    </StyledDropdownMenus>
  );
};

const StyledDropdownMenus = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  user-select: none;
`;

const Box = styled.div`
  ${({ theme: { colors, radius } }) => css`
    background-color: ${colors.neutral.background};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: ${radius.medium};
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    overflow: hidden;
  `}
`;

const Overlay = styled.button`
  ${({ theme: { colors } }) => css`
    width: 100vw;
    height: 100vh;
    background-color: ${colors.neutral.overlay};
    position: fixed;
    top: 0;
    left: 0;
  `}
`;
