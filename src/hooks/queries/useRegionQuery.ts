import { useQuery } from '@tanstack/react-query';
import { getRegions } from 'apis/region';

export const useRegionQuery = (searchWord: string) => {
  return useQuery(['region', searchWord], () => getRegions(searchWord));
};
