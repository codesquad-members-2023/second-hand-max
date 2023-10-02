import { useInfiniteQuery } from '@tanstack/react-query';
import { GetChatListParams, getChatList } from 'apis/chat';

export const useChatListInfiniteQuery = ({
  size,
  messageId,
}: Omit<GetChatListParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['chat'],
    queryFn: ({ pageParam = 0 }) =>
      getChatList({ page: pageParam, size, messageId }),
    getNextPageParam: (lastPage) => lastPage.data.paging.nextCursor,
    select: (data) => ({
      pages: data.pages.map((page) => page.data.contents),
      pageParams: data.pageParams,
    }),
  });
};
