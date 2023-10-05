import PATH from '@constants/PATH';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChatRoom } from 'apis/chat';
import { useNavigate } from 'react-router-dom';

export const useChatRoomCreateMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['chat'],
      });

      navigate(`/${PATH.CHATTING}/${data.data.chatRoomId}`);
    },
  });
};
