import { BASE_URL } from '@constants/BASE_URL';
import { useUserStore } from 'stores/useUserStore';

export const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (response.status === 401) {
    useUserStore.getState().handleTokenExpiry();
  }

  return response;
};
