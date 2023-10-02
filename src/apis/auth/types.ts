import { BaseResponse } from 'apis/types';
import { AccessToken, Tokens, User } from 'types';

type SignUpUserSuccess = BaseResponse & {
  statusCode: 201;
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

type SignInUserFailure = BaseResponse & {
  statusCode: 401;
  data: null;
};

type SignInUserSuccess = BaseResponse & {
  statusCode: 200;
  data: {
    jwt: Tokens;
    user: User;
  };
};

export type SignInUserResponse = SignInUserFailure | SignInUserSuccess;

type UpdateAccessTokenFailure = BaseResponse & {
  statusCode: 400;
  data: null;
};

type UpdateAccessTokenSuccess = BaseResponse & {
  statusCode: 200;
  data: {
    jwt: AccessToken;
  };
};

export type UpdateAccessTokenResponse =
  | UpdateAccessTokenFailure
  | UpdateAccessTokenSuccess;
