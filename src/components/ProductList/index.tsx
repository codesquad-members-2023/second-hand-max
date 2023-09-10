import { styled } from 'styled-components';
import ListItem from './ListItem';
import { ProductListItem } from 'apis/types';

const ProductList: React.FC = () => {
  return (
    <ProductListContainer>
      {productListItems.map((product) => (
        <ListItem key={product.itemId} {...product} />
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  padding: 0 16px;
`;

const productListItems: ProductListItem[] = [
  {
    itemId: 10,
    thumbnailUrl: '',
    title: '수납장',
    tradingRegion: '가전 2동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 9,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 8,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 7,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 6,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 5,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 4,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 3,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 2,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
  {
    itemId: 1,
    thumbnailUrl: '',
    title: '서랍',
    tradingRegion: '가전 3동',
    createdAt: '2023-08-29T06:12:40',
    price: 0,
    status: 'ON_SALE',
    chatCount: 0,
    wishCount: 0,
  },
];

export default ProductList;
