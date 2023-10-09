import { BaseResponse, Paging } from 'apis/types';
import { Address } from 'types/region';

export type GetRegionsResponse = BaseResponse & {
  data: {
    contents: Address[];
    paging: Paging;
  };
};
