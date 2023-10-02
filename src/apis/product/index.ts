import { fetchData } from 'apis/fetchData';
import { fetchDataWithToken } from 'apis/fetchData';
import {
  PostProductRequestData,
  GetProductDetailResponse,
  GetProductsResponse,
} from './types';
import { ProductStatus } from 'types/product';
import { getQueryString } from '@utils/getQueryString';

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

export const changeProductStatus = async ({
  itemId,
  status,
}: {
  itemId: string | number;
  status: ProductStatus;
}) => {
  const response = await fetchDataWithToken(`/items/${itemId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });

  return response.json();
};

export const getProducts = async (params: {
  region: string;
  categoryId?: string;
  cursor: number;
}): Promise<GetProductsResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchData(`/items?${queryString}`);

  return response.json();
};

export const getProductDetail = async (
  itemId: string,
): Promise<GetProductDetailResponse> => {
  const response = await fetchDataWithToken(`/items/${itemId}`);

  return response.json();
};

export const deleteProduct = async (itemId: string | number) => {
  const response = await fetchDataWithToken(`/items/${itemId}`, {
    method: 'DELETE',
  });

  return response.json();
};
