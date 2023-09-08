export type Product = {
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

export type User = {
  loginId: string;
  profileUrl: string;
};
