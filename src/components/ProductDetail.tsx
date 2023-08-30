import { styled } from 'styled-components';
import Product from 'types/Product';
import ListItem from './ProductList/ListItem';
import { useContext } from 'react';
import { AppStateDispatchContext } from 'contexts/AppContext';
import ActionType from '@constants/ActionType';

const ProductDetail: React.FC<Product> = (product) => {
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) {
    return null;
  }

  return (
    <Container>
      <ListItem {...product} />
      <button onClick={() => dispatch({ type: ActionType.CLOSE })}>
        fdjskalfdjsakf
      </button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
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
