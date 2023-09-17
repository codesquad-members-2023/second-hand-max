import { fetchData } from 'apis/fetchData';
import { GetRegionsResponse } from './types';

export const getRegions = async (
  query: string,
): Promise<GetRegionsResponse> => {
  const queryParams = query ? `?region${query}` : '';
  const response = await fetchData(`/regions${queryParams}`);

  return response.json();
};
