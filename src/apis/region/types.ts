import { BaseResponse } from 'apis/types';
import { Address } from 'types/region';

export type GetRegionsResponse = BaseResponse & {
  data: {
    contents: Address[];
    paging: {
      nextCursor: number;
      hasNext: boolean;
    };
  };
};
