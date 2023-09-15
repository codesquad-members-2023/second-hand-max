import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export const DropdownContainer: React.FC<Props> = ({ children }) => {
  return <StyledDropdownContainer>{children}</StyledDropdownContainer>;
};

const StyledDropdownContainer = styled.div`
  position: relative;
`;
