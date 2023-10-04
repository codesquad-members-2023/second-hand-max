import styled, { css } from 'styled-components';
import { TopBar } from './TopBar';
import { ProductInfoBanner } from './ProductInfoBanner';

export const ChatRoom: React.FC = () => {
  return (
    <StyledChatRoom>
      <TopBar />
      <ProductInfoBanner />
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
