import { css, styled } from 'styled-components';
import Tabs from './Tabs/index';
import { useContext } from 'react';
import { AppStateContext } from 'contexts/AppContext';
import Detail from './Detail';

const SecondHand: React.FC = () => {
  const state = useContext(AppStateContext);

  if (!state) {
    return null;
  }

  return (
    <Container>
      <Inner>
        <Tabs />
          <Detail />
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme: { radius, colors } }) => css`
    min-width: 393px;
    width: 393px;
    height: 912px;
    max-height: 100vh;
    border-radius: ${radius.large};
    padding: 0 ${radius.medium};
    padding-top: calc(${radius.large} * 2);
    padding-bottom: calc(${radius.large} * 3);
    background-color: ${colors.neutral.textWeak};
  `};
`;

const Inner = styled.div`
  position: relative;
  background-color: white;
  height: 100%;
  overflow: hidden;
`;

export default SecondHand;
