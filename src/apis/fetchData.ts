import { BASE_URL } from '@constants/BASE_URL';
import { useTokenStore } from 'stores/useTokenStore';
import { updateAccessToken } from './auth';

export const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (response.status === 401) {
    handleAccessTokenUpdate();
  }

  return response;
};

const handleAccessTokenUpdate = async () => {
  try {
    const tokenState = useTokenStore.getState();

    if (!tokenState.tokens) {
      throw new Error('로컬스토리지에 토큰이 없습니다.');
    }

    const tokenResponse = await updateAccessToken(
      tokenState.tokens.refreshToken,
    );
    const isSuccess = tokenResponse.statusCode === 200;

    if (isSuccess) {
      const { accessToken } = tokenResponse.data.jwt;
      const newTokens = { ...tokenState.tokens, accessToken };

      tokenState.setTokens(newTokens);
    } else {
      throw new Error('토큰 재발급에 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};
