import { AppStateDispatchContext } from 'contexts/AppContext';
import { useContext } from 'react';
import { css, styled } from 'styled-components';
import CloseButton from '@components/CloseButton';

const Header: React.FC = () => {
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) {
    return null;
  }

  return (
    <Container>
      <span>동네 설정</span>
      <CloseButton />
    </Container>
  );
};

const Container = styled.h2`
  ${({ theme: { fonts, colors } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 56px;
    ${fonts.display.strong20}
    stroke: ${colors.neutral.text};
  `}
`;

export default Header;
