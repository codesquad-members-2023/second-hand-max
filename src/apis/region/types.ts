import { Address } from 'types/region';

export type GetRegionsResponse = {
  statusCode: number;
  message: string;
  data: {
    contents: Address[];
    paging: {
      nextCursor: number;
      hasNext: boolean;
    };
  };
};
