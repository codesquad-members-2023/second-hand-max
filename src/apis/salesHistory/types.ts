export type ProductStatus = 'all' | 'on_sale' | 'sold_out';

export type GetSalesHistoryResponse = {
  statusCode: number;
  data: {
    contents: {
      itemId: number;
      thumbnailUrl: string;
      title: string;
      tradingRegion: string;
      createdAt: string;
      price: number;
      status: string;
      chatCount: number;
      wishCount: number;
    }[];
    paging: {
      nextCursor: number;
      hasNext: boolean;
    };
  };
};
