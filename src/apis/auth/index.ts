import { fetchData } from 'apis/fetchData';
import {
  SignInUserResponse,
  SignUpUserResponse,
  UpdateAccessTokenResponse,
} from './types';
import { useTokenStore } from 'stores/useTokenStore';
import { BASE_URL } from '@constants/BASE_URL';

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
