import { AccessToken, Tokens, User } from 'types';

type SignUpUserSuccess = {
  statusCode: 201;
  message: string;
  data: null;
};

type SignUpUserFailure =
  | {
      statusCode: 400;
      message: '잘못된 인가 코드입니다.';
      data: null;
    }
  | {
      statusCode: 400;
      message: '유효하지 않은 입력형식입니다.';
      data: {
        field: string;
        defaultMessage: string;
      }[];
    }
  | {
      statusCode: 409;
      message: string;
      data: null;
    };

export type SignUpUserResponse = SignUpUserSuccess | SignUpUserFailure;

type SignInUserFailure = {
  statusCode: 401;
  message: string;
  data: null;
};

type SignInUserSuccess = {
  statusCode: 200;
  message: string;
  data: {
    jwt: Tokens;
    user: User;
  };
};

export type SignInUserResponse = SignInUserFailure | SignInUserSuccess;

type UpdateAccessTokenFailure = {
  statusCode: 400;
  message: string;
  data: null;
};

type UpdateAccessTokenSuccess = {
  statusCode: 200;
  message: string;
  data: {
    jwt: AccessToken;
  };
};

export type UpdateAccessTokenResponse =
  | UpdateAccessTokenFailure
  | UpdateAccessTokenSuccess;
