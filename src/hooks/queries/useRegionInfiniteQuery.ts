import { useInfiniteQuery } from '@tanstack/react-query';
import { getRegions } from 'apis/region';

export const useRegionInfiniteQuery = (region: string) => {
  return useInfiniteQuery({
    queryKey: ['region', region],
    queryFn: ({ pageParam = 0 }) => getRegions({ region, cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.paging.nextCursor;
    },
    select: (data) => ({
      pages: data.pages.map((page) => page.data.contents),
      pageParams: data.pageParams,
    }),
  });
};
