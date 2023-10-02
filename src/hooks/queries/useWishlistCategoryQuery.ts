import { useQuery } from '@tanstack/react-query';
import { getWishlistCategory } from 'apis/wishlist';

export const useWishlistCategoryQuery = () => {
  return useQuery({
    queryKey: ['wishlist', 'category'],
    queryFn: getWishlistCategory,
    select: (data) => data.data.categories,
  });
};
