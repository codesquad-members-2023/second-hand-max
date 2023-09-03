import ActionType from '@constants/ActionType';
import Icons from '@design/Icons';
import { AppStateDispatchContext } from 'contexts/AppContext';
import { useContext } from 'react';
import { css, styled } from 'styled-components';

const Title: React.FC = () => {
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) {
    return null;
  }
  return (
    <Container>
      <button onClick={() => dispatch({ type: ActionType.CLOSE })}>
        <Icons.ChevronLeft />
        <span>닫기</span>
      </button>
    </Container>
  );
};

const Container = styled.h1`
  ${({ theme: { dimensions, fonts } }) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: ${dimensions.topBarHeight};
    width: 100%;
    position: absolute;
    top: 0;
    background: black;
    mix-blend-mode: difference;
    & > button {
      display: flex;
      align-items: center;
      padding: 8px;
      & > svg {
        stroke: white;
      }
      & > span {
        color: white;
        ${fonts.available.strong16}
        padding: 0 8px;
      }
    }
  `}
`;

export default Title;
