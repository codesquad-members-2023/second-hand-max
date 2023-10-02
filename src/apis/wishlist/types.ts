import { Paging } from 'apis/types';
import { ProductStatus } from 'types/product';

export type GetWishListResponse = {
  statusCode: number;
  data: {
    contents: {
      itemId: number;
      thumbnailUrl: string;
      title: string;
      tradingRegion: string;
      createdAt: string;
      price: number;
      status: ProductStatus;
      chatCount: number;
      wishCount: number;
      sellerId: string;
    }[];
    paging: Paging;
  };
};
