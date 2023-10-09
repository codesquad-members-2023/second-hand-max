import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatMessages } from 'apis/chat';
import { useRef } from 'react';

export const useChatMessagesInfiniteQuery = (chatRoomId: string) => {
  const ref = useRef<number | null>(null);

  return useInfiniteQuery({
    queryKey: ['chat-messages', chatRoomId],
    queryFn: ({ pageParam = 0 }) =>
      getChatMessages(chatRoomId, { messageId: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.nextMessageId) {
        return ref.current;
      }

      ref.current = lastPage.data.nextMessageId;

      return lastPage.data.nextMessageId;
    },
  });
};
