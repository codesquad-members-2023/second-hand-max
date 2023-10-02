import { useQuery } from '@tanstack/react-query';
import { getCategories } from 'apis/category';

export const useCategoryQuery = () => {
  const queryResult = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: (data) => data.data.categories,
    staleTime: Infinity,
  });

  const allCategories = queryResult.data;
  const withoutPopularCategories = allCategories?.filter(
    (category) => category.name !== '인기매물',
  );

  return {
    ...queryResult,
    allCategories,
    withoutPopularCategories,
  };
};
