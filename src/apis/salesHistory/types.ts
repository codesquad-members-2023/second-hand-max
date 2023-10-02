import { SalesHistoryProductListItem } from 'types/product';

export type ProductStatus = 'all' | 'on_sale' | 'sold_out';

export type GetSalesHistoryResponse = {
  statusCode: number;
  data: {
    contents: SalesHistoryProductListItem[];
    paging: {
      nextCursor: number;
      hasNext: boolean;
    };
  };
};
