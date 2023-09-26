import { BaseResponse } from 'apis/types';
import { Category } from 'types/category';

export type getCategoriesResponse = BaseResponse & {
  data: {
    categories: Category[];
  };
};
