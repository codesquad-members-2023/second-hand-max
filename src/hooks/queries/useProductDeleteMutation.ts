import PATH from '@constants/PATH';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from 'apis/product';
import { useNavigate } from 'react-router-dom';

export const useProductDeleteMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
      alert('상품 삭제 완료했습니다.');
      navigate(PATH.BASE);
    },
  });
};
