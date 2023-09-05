import ActionType from '@constants/ActionType';
import Icons from '@design/Icons';
import { AppStateDispatchContext } from 'contexts/AppContext';
import { useContext } from 'react';
import { styled } from 'styled-components';

const CloseButton: React.FC<{ blind?: boolean }> = ({ blind }) => {
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) {
    return null;
  }

  return (
    <Container
      type="button"
      value="cancel"
      formMethod="dialog"
      onClick={() => dispatch({type: ActionType.CLOSE})}
    >
      <Icons.XCross />
      <span className={blind ? '' : 'blind'}>닫기</span>
    </Container>
  );
};

const Container = styled.button`
  line-height: 0;
`;

export default CloseButton;
