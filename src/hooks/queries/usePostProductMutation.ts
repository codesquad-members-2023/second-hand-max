import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postProduct } from 'apis/product';
import { useModalStore } from 'stores/useModalStore';

export const usePostProductMutation = () => {
  const queryClient = useQueryClient();
  const closePostProductModal = useModalStore(
    ({ closePostProductModal }) => closePostProductModal,
  );

  return useMutation({
    mutationFn: postProduct,
    onSuccess() {
      alert('상품이 등록되었습니다.');
      closePostProductModal();
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
  });
};
