import TopBar from '@components/TopBar';
import { styled } from 'styled-components';

const Home: React.FC = () => {
  return (
    <>
      <TopBar aria-label="홈">홈</TopBar>
      <Container></Container>
    </>
  );
};

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
