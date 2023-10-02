import { Paging } from 'apis/types';

export type GetChatListResponse = {
  statusCode: number;
  data: {
    lastmessageId: number;
    contents: {
      chatRoomId: number;
      thumbnailUrl: string;
      chatPartnerName: string;
      chatPartnerProfile: string;
      lastSendTime: string;
      lastSendMessage: string;
      newMessageCount: number;
    }[];
    paging: Paging;
  };
};
