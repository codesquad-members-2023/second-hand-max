import { fetchDataWithToken } from 'apis/fetchData';
import {
  CreateChatRoomResponse,
  GetChatListParams,
  GetChatListResponse,
  GetChatMessagesResponse,
} from './types';
import { getQueryString } from '@utils/getQueryString';

export const postMessage = async ({
  chatRoomId,
  message,
}: {
  chatRoomId: string | number;
  message: string;
}) => {
  const response = await fetchDataWithToken(`/chats/${chatRoomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  return response.json();
};

export const getChatMessages = async (
  chatRoomId: string,
  params: {
    size?: number;
    messageId?: number;
  },
): Promise<GetChatMessagesResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchDataWithToken(
    `/chats/${chatRoomId}${queryString ? `?${queryString}` : ''}`,
  );

  return response.json();
};

export const getChatList = async (
  params: GetChatListParams,
  itemId?: string,
): Promise<GetChatListResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchDataWithToken(
    `${itemId ? `/items/${itemId}` : ''}/chats${
      queryString ? `?${queryString}` : ''
    }`,
  );

  return response.json();
};

export const createChatRoom = async (
  itemId: string,
): Promise<CreateChatRoomResponse> => {
  const response = await fetchDataWithToken(`/items/${itemId}/chats`, {
    method: 'POST',
  });

  return response.json();
};
