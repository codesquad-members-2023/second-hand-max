import { Paging } from 'apis/types';
import { Chat } from 'types/chat';

export type GetChatListResponse = {
  statusCode: number;
  data: {
    lastmessageId: number;
    contents: Chat[];
    paging: Paging;
  };
};
