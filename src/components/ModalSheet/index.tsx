import { AppStateContext, AppStateDispatchContext } from 'contexts/AppContext';
import { useContext } from 'react';
import { css, styled } from 'styled-components';
import LocationForm from './LocationForm';
import ActionType from '@constants/ActionType';
import ModalType from '@constants/ModalType';
import CategoryForm from './CategoryForm';
import BackButton from '@components/BackButton';
import Overlay from '@components/Overlay';

const ModalSheet: React.FC = () => {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);

  if (!state || !dispatch) {
    return null;
  }

  return (
    <Container
      open={state.modal ? true : false}
      onClose={() => dispatch({ type: ActionType.CLOSE })}
      $type={state.modal}
    >
      <Overlay />
      {<ModalForm type={state.modal} />}
    </Container>
  );
};

const Container = styled.dialog<{ $type: ModalType }>`
  ${({ theme: { radius }, $type }) => css`
    position: absolute;
    top: 0;
    padding: 4px 24px;
    border: 0;
    box-sizing: border-box;
    & > form {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 24px;
    }
    ${$type === ModalType.LOCATION &&
    css`
      width: 320px;
      height: 720px;
      border-radius: ${radius.large};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
    ${$type === ModalType.CATEGORY &&
    css`
      padding: 4px 24px;
      width: 393px;
      height: 912px;
      border-radius: 0;
      padding: 0;
      box-shadow: 0;
    `}
  `}
`;

const ModalForm: React.FC<{ type: ModalType }> = ({ type }) => {
  switch (type) {
    case ModalType.LOCATION:
      return <LocationForm />;
    case ModalType.CATEGORY:
      return <CategoryForm />;
    case ModalType.NULL:
      return null;
  }
};

export default ModalSheet;
