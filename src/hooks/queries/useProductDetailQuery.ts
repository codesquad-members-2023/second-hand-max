import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from 'apis/product';

export const useProductDetailQuery = (itemId: string) => {
  return useQuery({
    queryKey: ['product-detail', itemId],
    queryFn: () => getProductDetail(itemId),
    select: (data) => data.data,
  });
};
