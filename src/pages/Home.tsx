import ProductList from '@components/ProductList';
import TopBar from '@components/TopBar';
import {
  ActionType,
  AppStateContext,
  AppStateDispatchContext,
} from 'contexts/AppContext';
import { useContext } from 'react';
import { styled } from 'styled-components';

const Home: React.FC = () => {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);

  if (!state || !dispatch) {
    return null;
  }
  return (
    <>
      <Title aria-label="홈">홈</Title>
      <Container>
        <ProductList {...state} />
        <button
          onClick={() => dispatch({ type: ActionType.DETAIL, payload: 0 })}
        >
          DETAIL
        </button>
      </Container>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

const Container = styled.div`
  box-sizing: border-box;
  padding-top: ${({ theme: { dimensions } }) => dimensions.topBarHeight};
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px; /* 스크롤바의 너비 */
    padding: 0;
    height: 0;
  }
`;

export default Home;
