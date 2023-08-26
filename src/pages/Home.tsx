import TopBar from '@components/TopBar';
import { styled } from 'styled-components';

const Home: React.FC = () => {
  return (
    <>
      <Title aria-label="홈">홈</Title>
      <Container></Container>
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
