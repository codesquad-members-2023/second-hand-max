import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleWishlistProduct } from 'apis/wishlist';

export const useToggleWishlistProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishlistProduct,
    onSuccess: (_, { wish }) => {
      queryClient.invalidateQueries({
        queryKey: ['product-detail'],
      });
      alert(`관심상품을 ${wish === 'yes' ? '추가' : '삭제'}했습니다.`);
    },
  });
};
