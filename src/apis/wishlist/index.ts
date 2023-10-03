import { getQueryString } from '@utils/getQueryString';
import { fetchDataWithToken } from 'apis/fetchData';
import { GetWishListResponse } from './types';

export const getWishlist = async (params: {
  categoryId?: number;
  cursor: number;
}): Promise<GetWishListResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchDataWithToken(`/wishes?${queryString}`);

  return response.json();
};

export const toggleWishlistProduct = async ({
  itemId,
  wish,
}: {
  itemId: string;
  wish: 'yes' | 'no';
}) => {
  const response = await fetchDataWithToken(`/wishes/${itemId}?wish=${wish}`, {
    method: 'POST',
  });

  return response.json();
};

export const getWishlistCategory = async () => {
  const response = await fetchDataWithToken(`/wishes/categories`);

  return response.json();
};
