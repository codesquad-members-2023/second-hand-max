import { BaseResponse, Paging } from 'apis/types';
import { Chat } from 'types/chat';

export type GetChatListParams = {
  page?: number;
  size?: number;
};

export type GetChatListResponse = {
  statusCode: number;
  data: {
    contents: Chat[];
    paging: Paging;
  };
};

export type CreateChatRoomResponse = BaseResponse & {
  data: {
    chatRoomId: number;
  };
};
