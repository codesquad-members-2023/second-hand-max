import { styled } from 'styled-components';
import ListItem from './ListItem';
import Product from 'types/Product';

const ProductList: React.FC<{products: Product[]}> = ({products}) => {
  return (
    <Container>
      {products.map((product) => (
        <ListItem key={product.itemId} {...product} />
      ))}
    </Container>
  );
};



const Container = styled.ul``;

export default ProductList;
