import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { AccessToken, Tokens, User } from './types';

const BASE_URL: string =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_APP_BASE_URL
    : '';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (response.status === 401) {
    try {
      const tokenResponse = await updateAccessToken();
      const isSuccess = tokenResponse.statusCode === 200;

      if (isSuccess) {
        const { accessToken } = tokenResponse.data.jwt;

        localStorage.setItem(LOCAL_STORAGE_KEY.TOKENS, accessToken);
      } else {
        throw new Error('토큰 재발급에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return response;
};

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
  const tokens = localStorage.getItem(LOCAL_STORAGE_KEY.TOKENS);

  if (!tokens) {
    throw new Error('로컬스토리지에 access token이 없습니다.');
  }

  const { accessToken } = JSON.parse(tokens ?? '');

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

const updateAccessToken = async (): Promise<UpdateAccessTokenResponse> => {
  const tokens = localStorage.getItem(LOCAL_STORAGE_KEY.TOKENS);

  if (!tokens) {
    throw new Error('로컬스토리지에 토큰이 없습니다.');
  }

  const { refreshToken } = JSON.parse(tokens);

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
