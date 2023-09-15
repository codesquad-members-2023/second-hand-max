import { styled } from 'styled-components';
import Title from './Title';
import Visual from './Visual';
import Content from './Content';
import sample from '../../assets/sample.jpg';

const ProductDetail: React.FC = () => {
  return (
    <Container>
      <Title />
      <Visual url={sample} />
      <Content />
    </Container>
  );
};

const Container = styled.article`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0px; /* 스크롤바의 너비 */
    padding: 0;
    height: 0;
  }

  transform: translateX(0%);
  animation: 300ms animate alternate;

  @keyframes animate {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

export default ProductDetail;
