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

export type AccessToken = { accessToken: string };

type RefreshToken = { refreshToken: string };

export type Tokens = AccessToken & RefreshToken;
