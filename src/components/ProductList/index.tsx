import { styled } from 'styled-components';
import ListItem from './ListItem';
import { useContext } from 'react';
import { AppStateContext } from 'contexts/AppContext';

const ProductList: React.FC = () => {
  const state = useContext(AppStateContext);

  if(!state) return null;
  return (
    <Container>
      {state.products.map((product) => (
        <ListItem key={product.itemId} {...product} />
      ))}
    </Container>
  );
};

const Container = styled.ul``;

export default ProductList;
