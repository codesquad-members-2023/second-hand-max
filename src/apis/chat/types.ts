import { BaseResponse, Paging } from 'apis/types';
import { Chat, ChatMessage } from 'types/chat';

export type GetChatMessagesResponse = {
  statusCode: number;
  data: {
    chatPartnerName: string;
    item: {
      title: string;
      thumbnailUrl: string;
      price: number;
    };
    chat: ChatMessage[];
    nextMessageId: number;
  };
};

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
