import Fab from '@components/Fab';
import ProductList from '@components/ProductList';
import { styled } from 'styled-components';
import { Title } from './Title';

export const Home: React.FC = () => {
  return (
    <>
      <Title />
      <Content>
        <ProductList />
        <Fab />
      </Content>
    </>
  );
};

const Content = styled.div`
  box-sizing: border-box;
  padding: 16px;
  padding-top: ${({ theme: { dimensions } }) => dimensions.topBarHeight};
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    padding: 0;
    height: 0;
  }
`;
