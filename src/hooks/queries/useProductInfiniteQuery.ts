import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from 'apis/product';

export const useProductInfiniteQuery = (
  region: string,
  categoryId?: string,
) => {
  return useInfiniteQuery(
    ['product', region, categoryId],
    ({ pageParam = 0 }) =>
      getProducts({ region, categoryId, nextPageParam: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.paging.nextCursor;
      },
      select: (data) => {
        return {
          pages: [...data.pages.map((page) => page.data.contents)],
          pageParams: [...data.pageParams],
        };
      },
    },
  );
};
