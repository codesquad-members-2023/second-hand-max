import styled from 'styled-components';
import { DropdownProvider } from './DropdownContext';

type Props = {
  children: React.ReactNode;
};

export const DropdownContainer: React.FC<Props> = ({ children }) => {
  return (
    <DropdownProvider>
      <StyledDropdown>{children}</StyledDropdown>
    </DropdownProvider>
  );
};

const StyledDropdown = styled.div`
  position: relative;
`;
