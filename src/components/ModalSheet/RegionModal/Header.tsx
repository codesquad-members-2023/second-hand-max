import Icons from '@design/Icons';
import { AppStateDispatchContext } from 'contexts/AppContext';
import { MouseEvent, useContext } from 'react';
import { css, styled } from 'styled-components';

// 예약어인것은 알지만 기획서에 영역이름이 이렇게 되어있었습니다.
const Header: React.FC = () => {
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) {
    return null;
  }

  function onCloseButton(e:MouseEvent) {
    const btn = e.target as HTMLElement;
    const dialog = btn.closest('dialog');
    dialog?.close('cancel');
  }

  return (
    <Container>
      <span>동네 설정</span>
      <button
        type="button"
        value="cancel"
        formMethod="dialog"
        onClick={onCloseButton}
      >
        <Icons.XCross />
        <span className="blind">닫기</span>
      </button>
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
    & > button {
      line-height: 0;
    }
  `}
`;

export default Header;
