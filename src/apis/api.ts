import { BASE_URL } from '@constants/BASE_URL';
import { fetchData } from './fetchData';
import { AccessToken, Tokens, User } from './types';
import { useTokenStore } from 'stores/useTokenStore';

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

type SignUpUserResponse = SignUpUserSuccess | SignUpUserFailure;

export const signUpUser = async ({
  code,
  id,
  file,
}: {
  code: string;
  id: string;
  file?: File;
}): Promise<SignUpUserResponse> => {
  const formData = new FormData();

  if (file) {
    formData.append('profile', file);
  }

  const data = JSON.stringify({ loginId: id, addressNames: ['가락 1동'] });
  formData.append('signupData', new Blob([data], { type: 'application/json' }));

  const response = await fetchData(`/auth/naver/signup?code=${code}`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

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

type SignInUserResponse = SignInUserFailure | SignInUserSuccess;

export const signInUser = async ({
  code,
  id,
}: {
  code: string;
  id: string;
}): Promise<SignInUserResponse> => {
  const response = await fetchData(`/auth/naver/login?code=${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId: id,
    }),
  });

  return response.json();
};

export const signOutUser = () => {
  const tokens = useTokenStore.getState().tokens;

  if (!tokens) {
    throw new Error('로컬스토리지에 access token이 없습니다.');
  }

  const { accessToken } = tokens;

  return fetchData('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
};

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

type UpdateAccessTokenResponse =
  | UpdateAccessTokenFailure
  | UpdateAccessTokenSuccess;

export const updateAccessToken = async (
  refreshToken: string,
): Promise<UpdateAccessTokenResponse> => {
  const response = await fetch(BASE_URL + '/auth/token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getRegions = () => {
  return fetchData('/auth/regions');
};
