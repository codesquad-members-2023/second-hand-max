import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ChatMessage } from 'types/chat';

export const Messages: React.FC<{ messages?: ChatMessage[] }> = ({
  messages,
}) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <StyledMessages ref={messagesRef}>
      {messages?.map((message) => (
        <Message key={message.messageId} $isMe={message.isMe}>
          {message.message}
        </Message>
      ))}
    </StyledMessages>
  );
};

const StyledMessages = styled.div`
  height: 0;
  overflow: scroll;
  padding: 12px 16px;
  flex-grow: 1;
`;

const Message = styled.div<{ $isMe: boolean }>`
  ${({ theme: { radius, fonts, colors }, $isMe }) => css`
    width: fit-content;
    max-width: 256px;
    border-radius: ${radius.large};
    padding: 8px 16px;
    ${fonts.display.default16};
    margin-bottom: 8px;

    ${$isMe
      ? css`
          background-color: ${colors.accent.primary};
          color: ${colors.neutral.background};
          margin-left: auto;
        `
      : css`
          background-color: ${colors.neutral.backgroundBold};
          color: ${colors.neutral.textStrong};
        `}
  `};
`;
