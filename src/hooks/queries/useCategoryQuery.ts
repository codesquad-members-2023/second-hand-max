import { useQuery } from '@tanstack/react-query';
import { getCategories } from 'apis/category';

export const useCategoryQuery = () => {
  return useQuery(['category'], getCategories, {
    select: (data) => data.data.categories,
  });
};
