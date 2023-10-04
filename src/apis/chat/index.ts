import { fetchDataWithToken } from 'apis/fetchData';
import { GetChatListResponse } from './types';
import { getQueryString } from '@utils/getQueryString';

export type GetChatListParams = {
  page?: number;
  size?: number;
  messageId?: string;
};

export const getChatList = async (
  params: GetChatListParams,
  itemId?: string,
): Promise<GetChatListResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchDataWithToken(
    `${itemId ? `/items/${itemId}` : ''}/chats?${queryString}`,
  );

  return response.json();
};
