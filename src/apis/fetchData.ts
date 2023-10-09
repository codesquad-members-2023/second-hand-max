import { BASE_URL } from '@constants/ENV_VARIABLES';
import { useUserStore } from 'stores/useUserStore';

export const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  return response;
};

export const fetchDataWithToken = async (
  path: string,
  options?: RequestInit,
): Promise<Response> => {
  const { accessToken } = useUserStore.getState().getTokens();
  const response = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: 'Bearer ' + accessToken,
    },
  });

  if (response.status === 401) {
    await useUserStore.getState().handleTokenExpiry();
    const { accessToken } = useUserStore.getState().getTokens();

    const response = await fetchDataWithToken(path, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return response;
  }

  return response;
};
