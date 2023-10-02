import { useQuery } from '@tanstack/react-query';
import { getUserAddresses } from 'apis/user';

export const useUserAddressQuery = () => {
  const queryResult = useQuery({
    queryKey: ['user', 'address'],
    queryFn: getUserAddresses,
    select: (data) => data.data.addresses,
  });

  const currentRegion = queryResult.data?.find((address) => address.isSelected);

  return {
    ...queryResult,
    currentRegion,
  };
};
