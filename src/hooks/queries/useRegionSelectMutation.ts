import { useMutation, useQueryClient } from '@tanstack/react-query';
import { selectRegion } from 'apis/region';
import { useUserStore } from 'stores/useUserStore';

export const useRegionSelectMutation = () => {
  const { getUser, setCurrentRegion } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectRegion,
    onSuccess: (_, selectAddressId) => {
      const selectAddress = getUser().addresses.find(
        ({ addressId }) => addressId === selectAddressId,
      );
      setCurrentRegion(selectAddress!);
      queryClient.invalidateQueries({
        queryKey: ['user', 'address'],
      });
    },
  });
};
