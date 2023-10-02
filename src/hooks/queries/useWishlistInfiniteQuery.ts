import { useInfiniteQuery } from '@tanstack/react-query';
import { getWishlist } from 'apis/wishlist';

export const useWishlistInfiniteQuery = (categoryId?: number) => {
  return useInfiniteQuery({
    queryKey: ['wishlist', categoryId],
    queryFn: ({ pageParam = 0 }) =>
      getWishlist({ categoryId, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.paging.nextCursor,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data.contents),
      pageParams: data.pageParams,
    }),
  });
};
