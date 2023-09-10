import Fab from '@components/Fab';
import ProductList from '@components/ProductList';
import TopBar from '@components/TopBar';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Home: React.FC = () => {
  return (
    <>
      <Title aria-label="홈">홈</Title>
      <Content>
        <ProductList />
        <Fab />
        <Outlet />
      </Content>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 16px;
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
