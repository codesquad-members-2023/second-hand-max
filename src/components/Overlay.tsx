import { AppStateDispatchContext } from 'contexts/AppContext';
import { css, styled } from 'styled-components';
import { useContext } from 'react';
import ActionType from '@constants/ActionType';

const Overlay: React.FC = () => {
  const dispatch = useContext(AppStateDispatchContext);
  if(!dispatch) {
    return null;
  }
  return <Container onClick={() => dispatch({type: ActionType.CLOSE})}></Container>;
};

const Container = styled.button`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background-color: ${colors.neutral.overlay};
    opacity: 0.2;
  `}
`;

export default Overlay;
