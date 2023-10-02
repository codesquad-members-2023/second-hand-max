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
): Promise<GetChatListResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchDataWithToken(`/chats?${queryString}`);

  return response.json();
};
