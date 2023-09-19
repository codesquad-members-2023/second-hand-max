import { css, styled } from 'styled-components';
import { useDropdownContext } from './useDropdownContext';

type Props = {
  children: React.ReactNode;
};

export const DropdownIndicator: React.FC<Props> = ({ children }) => {
  const { openDropdown } = useDropdownContext();

  return (
    <StyledDropdownIndicator onClick={openDropdown}>
      {children}
    </StyledDropdownIndicator>
  );
};

const StyledDropdownIndicator = styled.div`
  ${({ theme: { fonts } }) => css`
    ${fonts.available.strong16};
    display: flex;
    cursor: pointer;
  `};
`;
