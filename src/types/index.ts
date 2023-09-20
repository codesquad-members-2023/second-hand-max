import { Address } from './region';

export type User = {
  loginId: string;
  profileUrl: string;
  addresses: Address[];
};

export type AccessToken = { accessToken: string };

type RefreshToken = { refreshToken: string };

export type Tokens = AccessToken & RefreshToken;
