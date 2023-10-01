import { fetchDataWithToken } from 'apis/fetchData';

export const getWishlist = async (params: {
  categoryId?: number;
  cursor: number;
}) => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (key && value) {
      urlParams.append(key, String(value));
    }
  });

  const response = await fetchDataWithToken(`/wishes${urlParams}`);

  return response.json();
};

export const getWishlistCategory = async () => {
  const response = await fetchDataWithToken(`/wishes/categories`);

  return response.json();
};
