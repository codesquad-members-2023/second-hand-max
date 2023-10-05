import { Paging } from 'apis/types';
import {
  CommonProductData,
  ProductListItem,
  ProductStatus,
} from 'types/product';

export type GetProductsResponse = {
  statusCode: number;
  data: {
    contents: ProductListItem[];
    paging: Paging;
  };
};

export type PostProductRequestData = {
  thumbnailImage: File;
  images?: File[];
  title: string;
  price?: string;
  content?: string;
  region: string;
  status: ProductStatus;
  categoryId: number;
  categoryName: string;
};

export type GetProductDetailResponse = {
  statusCode: number;
  data:
    | ({
        isSeller: true;
      } & CommonProductData)
    | ({
        isSeller: false;
        chatRoomId: number | null;
      } & CommonProductData);
};
