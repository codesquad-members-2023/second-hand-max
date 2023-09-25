export type ProductListItem = {
  itemId: number;
  thumbnailUrl: string;
  title: string;
  tradingRegion: string;
  createdAt: string;
  price: number;
  status: string;
  chatCount: number;
  wishCount: number;
};

export type ProductDetail = {
  isSeller: boolean;
  imageUrls: string[];
  seller: string;
  status?: string;
  title: string;
  categoryName: string;
  createdAt: string;
  content: string;
  chatCount: number;
  wishCount: number;
  viewCount: number;
  price: number;
};
