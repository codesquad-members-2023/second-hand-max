import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postProduct } from 'apis/product';

export const usePostProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProduct,
    onSuccess() {
      alert('상품이 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
  });
};
