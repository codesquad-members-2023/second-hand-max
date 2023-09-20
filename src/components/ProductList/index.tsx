import { styled } from 'styled-components';
import ListItem from './ListItem';
import { ProductListItem } from 'types/product';
import { InfiniteData } from '@tanstack/react-query';

type Props = {
  productListItems?: InfiniteData<ProductListItem[]>;
};

export const ProductList: React.FC<Props> = ({ productListItems }) => {
  return (
    <ProductListContainer>
      {productListItems &&
        productListItems.pages.map((page) =>
          page.map((product) => <ListItem key={product.itemId} {...product} />),
        )}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  padding: 0 16px;
`;
