import { fetchData } from 'apis/fetchData';
import { getCategoriesResponse } from './types';

export const getCategories = async (): Promise<getCategoriesResponse> => {
  const response = await fetchData('/categories');

  return response.json();
};
