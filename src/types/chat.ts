export type Chat = {
  chatRoomId: number;
  thumbnailUrl: string;
  chatPartnerName: string;
  chatPartnerProfile: string;
  lastSendTime: string;
  lastSendMessage: string;
  newMessageCount: number;
};

export type ChatMessage = {
  messageId: number;
  isMe: boolean;
  message: string;
};
