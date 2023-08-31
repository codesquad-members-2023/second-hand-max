import { AppStateContext, AppStateDispatchContext } from 'contexts/AppContext';
import { useContext, useEffect, useRef } from 'react';
import { css, styled } from 'styled-components';
import LocationForm from './LocationModal';
import ActionType from '@constants/ActionType';

const ModalSheet: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);

  useEffect(() => {
    if (dialogRef.current && state && state.modal) {
      if (!state.modal) {
        dialogRef.current.close();
      }
      dialogRef.current.showModal();
    }
  }, [state]);

  if (!state || !dispatch) {
    return null;
  }

  function onCloseHandler() {
    const value = dialogRef.current?.returnValue;
    if (value === 'cancel' && dispatch) {
      dispatch({ type: ActionType.CLOSE });
    }
  }

  return (
    <Container ref={dialogRef} onClose={onCloseHandler} $type={state.modal}>
      {state.modal === 'LOCATION' && <LocationForm />}
    </Container>
  );
};

const Container = styled.dialog<{ $type: null | 'LOCATION' }>`
  ${({ theme: { radius }, $type }) => css`
    padding: 4px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 0;
    box-sizing: border-box;
    border-radius: ${radius.large};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    ${$type === 'LOCATION'
      ? css`
          width: 320px;
          height: 720px;
        `
      : ''}
  `}
`;

export default ModalSheet;
