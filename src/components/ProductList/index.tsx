import { styled } from 'styled-components';
import ListItem from './ListItem';
import { useUserStore } from 'stores/useUserStore';
import { ProductListItem } from 'types/product';

type Props = {
  productListItems: ProductListItem[];
  isMenuButtonAlwaysVisible?: boolean;
};

export const ProductList: React.FC<Props> = ({
  productListItems,
  isMenuButtonAlwaysVisible,
}) => {
  const loginId = useUserStore(({ user }) => user?.loginId);

  return (
    <StyledProductList>
      {productListItems.map((product) => (
        <ListItem
          key={product.itemId}
          isMenuButtonVisible={
            isMenuButtonAlwaysVisible || product.sellerId === loginId
          }
          {...product}
        />
      ))}
    </StyledProductList>
  );
};

const StyledProductList = styled.ul`
  padding: 0 16px;
`;
