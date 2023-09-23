import { fetchData } from 'apis/fetchData';
import { fetchDataWithToken } from 'apis/fetchData';
import {
  PostProductRequestData,
  getProductDetailResponse,
  getProductsResponse,
} from './types';

export const getProducts = async ({
  region,
  categoryId,
  nextPageParam,
}: {
  region: string;
  categoryId?: string;
  nextPageParam: number;
}): Promise<getProductsResponse> => {
  const params = new URLSearchParams();

  if (region) {
    params.append('region', region);
  }

  if (categoryId) {
    params.append('categoryId', categoryId);
  }

  if (nextPageParam) {
    params.append('categoryId', String(nextPageParam));
  }

  const response = await fetchData(`/items?${params}`);

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
  const response = await fetchData(`/items/${itemId}`);

  return response.json();
};
