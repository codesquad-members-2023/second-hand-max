import { BASE_URL, fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getItems = async ({
  pageParam: cursor,
  categoryId,
}: {
  pageParam: number;
  categoryId?: number;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.ITEMS);

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  categoryId !== undefined &&
    url.searchParams.append('categoryId', String(categoryId));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const getSalesList = async ({
  pageParam: cursor,
  isSold,
  nickname,
}: {
  pageParam?: number;
  isSold?: boolean;
  nickname: string;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.SALES_LIST(nickname));

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  isSold !== undefined && url.searchParams.append('isSold', String(isSold));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const getFavorites = async ({
  pageParam: cursor,
  categoryId,
}: {
  pageParam?: number;
  categoryId?: number;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.FAVORITES);

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  categoryId !== undefined &&
    url.searchParams.append('categoryId', String(categoryId));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const getFavoritesCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.FAVORITES_CATEGORY);

  return res.data;
};

export const getCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.CATEGORIES);

  return res.data;
};

export const getItemDetails = async (itemId: number) => {
  const res = await fetcher.get(`${API_ENDPOINT.ITEMS}/${itemId}`);

  return res.data;
};

export const patchFavorite = async ({
  itemId,
  isFavorite,
}: {
  itemId: number;
  isFavorite: boolean;
}) => {
  const res = await fetcher.patch(`${API_ENDPOINT.ITEMS}/${itemId}/favorites`, {
    isFavorite,
  });

  return res.data;
};

export const patchStatus = async ({
  itemId,
  statusName,
}: {
  itemId: number;
  statusName: '판매중' | '예약중' | '판매완료';
}) => {
  const res = await fetcher.patch(`${API_ENDPOINT.ITEMS}/${itemId}/status`, {
    statusName,
  });

  return res.data;
};
