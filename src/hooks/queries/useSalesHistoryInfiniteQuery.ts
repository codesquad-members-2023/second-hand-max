import { useInfiniteQuery } from '@tanstack/react-query';
import { getSalesHistory } from 'apis/salesHistory';
import { ProductStatus } from 'apis/salesHistory/types';

export const useSalesHistoryInfiniteQuery = (status: ProductStatus) => {
  return useInfiniteQuery({
    queryKey: ['product', status],
    queryFn: ({ pageParam = 0 }) =>
      getSalesHistory({ status, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.paging.nextCursor,
    select: (data) => ({
      pages: data.pages.map((page) => page.data.contents),
      pageParams: data.pageParams,
    }),
  });
};
