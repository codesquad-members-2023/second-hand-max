import Icons from '@design/Icons';
import { MouseEvent } from 'react';
import { css, styled } from 'styled-components';
import CloseButton from '@components/CloseButton';

const Header: React.FC = () => {
  function onCloseButton(e: MouseEvent) {
    const btn = e.target as HTMLElement;
    const dialog = btn.closest('dialog');
    dialog?.close('cancel');
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
