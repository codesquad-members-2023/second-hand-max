import styled, { css } from 'styled-components';
import { TopBar } from './TopBar';
import { ProductInfoBanner } from './ProductInfoBanner';
import { ChatBar } from './ChatBar';
import { Messages } from './Messages';

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
