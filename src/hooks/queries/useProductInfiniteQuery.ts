import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from 'apis/product';

export const useProductInfiniteQuery = (
  region: string,
  categoryId?: string,
) => {
  return useInfiniteQuery({
    queryKey: ['product', region, categoryId],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({ region, categoryId, nextPageParam: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.paging.nextCursor,
    select: (data) => ({
      pages: [...data.pages.map((page) => page.data.contents)],
      pageParams: [...data.pageParams],
    }),
  });
};
