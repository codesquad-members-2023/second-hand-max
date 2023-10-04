import styled, { css } from 'styled-components';
import { TopBar } from './TopBar';
import { ProductInfoBanner } from './ProductInfoBanner';
import { ChatBar } from './ChatBar';

export const ChatRoom: React.FC = () => {
  return (
    <StyledChatRoom>
      <TopBar />
      <ProductInfoBanner />
      <div>안녕하세요! 한 가지 궁금한 점이 있어서 챗 드려요</div>
      <div>네, 안녕하세요!</div>
      <div>어떤 점이 궁금하신가욤?</div>
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
  `};
`;
