import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMessage } from 'apis/chat';

export const useChatMessagePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat-messages'],
      });
    },
  });
};
