import { fetchDataWithToken } from 'apis/fetchData';
import { GetChatListParams, GetChatListResponse } from './types';
import { getQueryString } from '@utils/getQueryString';

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
