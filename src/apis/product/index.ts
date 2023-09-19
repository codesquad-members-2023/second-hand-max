import { fetchDataWithToken } from 'apis/fetchData';
import { getProductsResponse } from './types';

export const getProducts = async ({
  region,
  categoryId,
  nextPageParam,
}: {
  region: string;
  categoryId?: string;
  nextPageParam: number;
}): Promise<getProductsResponse> => {
  const params = new URLSearchParams();

  if (region) {
    params.append('region', region);
  }

  if (categoryId) {
    params.append('categoryId', categoryId);
  }

  if (nextPageParam) {
    params.append('categoryId', String(nextPageParam));
  }

  const response = await fetchDataWithToken(`/items/?${params}`);

  return response.json();
};
