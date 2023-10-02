import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeProductStatus } from 'apis/product';

export const useProductStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeProductStatus,
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
      alert(`${status}(으)로 변경하였습니다.`);
    },
  });
};
