import { ProductListItem } from 'types/product';

export type getProductsResponse = {
  statusCode: number;
  data: {
    contents: ProductListItem[];
    paging: {
      nextCursor: number;
      hasNext: boolean;
    };
  };
};
