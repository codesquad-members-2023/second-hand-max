import { css, styled } from 'styled-components';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const DropdownIndicator: React.FC<Props> = ({ children, onClick }) => {
  return (
    <StyledDropdownIndicator onClick={onClick}>
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
