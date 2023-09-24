import { fetchData } from 'apis/fetchData';
import { GetRegionsResponse } from './types';

export const getRegions = async (
  query: string = '역삼동',
  nextPageParam: number,
): Promise<GetRegionsResponse> => {
  const params = new URLSearchParams();

  if (query) {
    params.append('region', query);
  }

  if (nextPageParam) {
    params.append('cursor', String(nextPageParam));
  }

  const response = await fetchData(`/regions?${params}`);

  return response.json();
};
