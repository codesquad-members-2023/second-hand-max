import { fetchData } from 'apis/fetchData';
import { fetchDataWithToken } from 'apis/fetchData';
import {
  PostProductRequestData,
  getProductDetailResponse,
  getProductsResponse,
} from './types';

export const getProducts = async (params: {
  region: string;
  categoryId?: string;
  nextPageParam: number;
}): Promise<getProductsResponse> => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (key && value) {
      urlParams.append(key, String(value));
    }
  });

  const response = await fetchData(`/items?${urlParams}`);

  return response.json();
};

export const postProduct = async ({
  thumbnailImage,
  images,
  title,
  price,
  content,
  region,
  status,
  categoryId,
  categoryName,
}: PostProductRequestData) => {
  const formData = new FormData();

  if (thumbnailImage) {
    formData.append('thumbnailImage', thumbnailImage);
  }

  if (images) {
    images.forEach((image) => {
      formData.append('images', image);
    });
  }

  const data = JSON.stringify({
    title,
    price,
    content,
    region,
    status,
    categoryId,
    categoryName,
  });
  formData.append('item', new Blob([data], { type: 'application/json' }));

  const response = await fetchDataWithToken('/items', {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

export const getProductDetail = async (
  itemId: string,
): Promise<getProductDetailResponse> => {
  const response = await fetchDataWithToken(`/items/${itemId}`);

  return response.json();
};
