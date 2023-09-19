import { Category } from 'types/category';

export type getCategoriesResponse = {
  statusCode: number;
  message: string;
  data: {
    categories: Category[];
  };
};
