import styled, { css } from 'styled-components';
import { TopBar } from './TopBar';
import { ProductInfoBanner } from './ProductInfoBanner';
import { ChatBar } from './ChatBar';
import { Messages } from './Messages';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useChatMessagePostMutation } from '@hooks/queries/useChatMessagePostMutation';
import { createChatRoom, postMessage } from 'apis/chat';
import { useChatMessagesInfiniteQuery } from '@hooks/queries/useChatMessagesInfiniteQuery';
import { Loader } from '@components/Loader';
import { ErrorPage } from '@pages/ErrorPage';
import { useEffect, useState } from 'react';

export const ChatRoom: React.FC = () => {
  const [longPolling, setLongPolling] = useState(false);
  const { chatRoomId } = useParams();
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } =
    useChatMessagesInfiniteQuery(chatRoomId!);

  useEffect(() => {
    if (isFetchingNextPage) return;

    (async () => {
      await fetchNextPage();
      setLongPolling((value) => !value);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longPolling]);

  const flattenData = data?.pages.flatMap((page) => page.data) ?? [];
  const messages = flattenData.flatMap((message) => message.chat);

  if (isError || !chatRoomId) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const itemData = data.pages[0]!.data;

  return (
    <StyledChatRoom>
      <TopBar chatPartnerName={itemData.chatPartnerName} />
      <ProductInfoBanner
        title={itemData.item.title}
        thumbnailUrl={itemData.item.thumbnailUrl}
        price={itemData.item.price}
      />
      <Messages messages={messages} />
      <ChatBar
        onSendMessage={(message: string) => {
          if (!message) {
            return;
          }

          postMessage({ chatRoomId, message });
        }}
      />
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
      <TopBar chatPartnerName={seller} />
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
    overflow: scroll;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${colors.neutral.background};
    display: flex;
    flex-direction: column;
  `};
`;
