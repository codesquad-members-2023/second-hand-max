export type BaseResponse = {
  statusCode: number;
  message: string;
};

export type Paging = {
  nextCursor: number;
  hasNext: boolean;
};
