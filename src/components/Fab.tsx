import Icons from '@design/Icons';
import { css, styled } from 'styled-components';
import { useContext } from 'react';
import { AppStateContext, AppStateDispatchContext } from 'contexts/AppContext';
import ActionType from '@constants/ActionType';
import ModalType from '@constants/ModalType';

const Fab: React.FC = () => {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) return null;

  return (
    <Container
      onClick={() => {
        dispatch({ type: ActionType.MODAL, payload: ModalType.CATEGORY });
        console.log(state);
      }}
    >
      <Icons.Plus />
    </Container>
  );
};

const Container = styled.button`
  ${({ theme: { colors, radius } }) => css`
    height: 56px;
    width: 56px;
    position: absolute;
    bottom: 88px;
    right: 24px;
    border-radius: ${radius.half};

    display: flex;
    align-items: center;
    justify-content: center;
    stroke: ${colors.accent.text};
    background-color: ${colors.accent.primary};
  `}
`;

export default Fab;
