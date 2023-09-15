export type GetRegionsResponse = {
  statusCode: number;
  message: string;
  data: {
    contents: {
      addressId: number;
      fullAddressName: string;
      addressName: string;
    }[];
    paging: {
      nextCursor: number;
      hasNext: boolean;
    };
  };
};
