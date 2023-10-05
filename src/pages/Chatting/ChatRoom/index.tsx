import styled, { css } from 'styled-components';
import { TopBar } from './TopBar';
import { ProductInfoBanner } from './ProductInfoBanner';
import { ChatBar } from './ChatBar';
import { Messages } from './Messages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatMessagePostMutation } from '@hooks/queries/useChatMessagePostMutation';
import { createChatRoom } from 'apis/chat';

export const ChatRoom: React.FC = () => {
  return (
    <StyledChatRoom>
      <TopBar />
      <ProductInfoBanner />
      <Messages />
      <ChatBar />
    </StyledChatRoom>
  );
};

export const NewChatRoom: React.FC = () => {
  const location = useLocation();
  const { title, thumbnailUrl, price, seller, itemId } = location.state;
  const { mutate: postMessage } = useChatMessagePostMutation();
  const navigate = useNavigate();

  return (
    <StyledChatRoom>
      <TopBar seller={seller} />
      <ProductInfoBanner
        title={title}
        thumbnailUrl={thumbnailUrl}
        price={price}
      />
      <Messages />
      <ChatBar
        onSendMessage={(message: string) => {
          if (!message) {
            return;
          }

          (async () => {
            const {
              data: { chatRoomId },
            } = await createChatRoom(itemId);

            if (chatRoomId) {
              postMessage({ chatRoomId, message });
              navigate(`/chatting/${chatRoomId}`);
            }
          })();
        }}
      />
    </StyledChatRoom>
  );
};

const StyledChatRoom = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${colors.neutral.background};
    display: flex;
    flex-direction: column;
  `};
`;
