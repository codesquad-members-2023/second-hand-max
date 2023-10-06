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
    <ul>
      {productListItems.map((product) => (
        <ListItem
          key={product.itemId}
          isMenuButtonVisible={
            isMenuButtonAlwaysVisible || product.sellerId === loginId
          }
          {...product}
        />
      ))}
    </ul>
  );
};
