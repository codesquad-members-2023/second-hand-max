import { styled } from 'styled-components';
import ListItem from './ListItem';

const ProductList: React.FC = () => {
  return (
    <Container>
      {[
        {
          itemId: 0,
          thumbnailUrl: 'http:~~',
          title: '잎사귀 포스터',
          tradingRegion: '역삼 1동',
          createdAt: '2023-08-22T14:14:32',
          price: 59000,
          status: '판매중',
          chatCount: 0,
          wishCount: 1,
        },
      ].map((product) => (
        <ListItem key={product.itemId} {...product} />
      ))}
    </Container>
  );
};

const Container = styled.ul``;

export default ProductList;
