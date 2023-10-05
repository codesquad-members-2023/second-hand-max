import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatList } from 'apis/chat';
import { GetChatListParams } from 'apis/chat/types';

export const useChatListInfiniteQuery = (
  { size }: Omit<GetChatListParams, 'page'>,
  itemId?: string,
) => {
  return useInfiniteQuery({
    queryKey: ['chat'],
    queryFn: ({ pageParam = 0 }) =>
      getChatList({ page: pageParam, size }, itemId),
    getNextPageParam: (lastPage) => lastPage.data.paging.nextCursor,
    select: (data) => ({
      pages: data.pages.map((page) => page.data.contents),
      pageParams: data.pageParams,
    }),
  });
};
