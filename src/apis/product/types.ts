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

export type PostProductRequestData = {
  thumbnailImage: File;
  images?: File[];
  title: string;
  price?: number;
  content?: string;
  region: string;
  status: '판매중' | '판매완료' | '예약중';
  categoryId: number;
  categoryName: string;
};
