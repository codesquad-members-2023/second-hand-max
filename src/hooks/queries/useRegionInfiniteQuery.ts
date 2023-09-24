import { useInfiniteQuery } from '@tanstack/react-query';
import { getRegions } from 'apis/region';

export const useRegionInfiniteQuery = (searchWord: string) => {
  return useInfiniteQuery(
    ['region', searchWord],
    ({ pageParam = 0 }) => getRegions(searchWord, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.paging.nextCursor;
      },
    },
  );
};
