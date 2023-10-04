import { Paging } from 'apis/types';
import { Chat } from 'types/chat';

export type GetChatListParams = {
  page?: number;
  size?: number;
  messageId?: string;
};

export type GetChatListResponse = {
  statusCode: number;
  data: {
    lastmessageId: number;
    contents: Chat[];
    paging: Paging;
  };
};
