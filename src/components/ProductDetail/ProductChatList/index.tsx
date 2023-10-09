import styled, { css } from 'styled-components';
import { Title } from './Title';
import { ChatList } from './ChatList';

export const ProductChatList: React.FC = () => {
  return (
    <Container>
      <Title />
      <ChatList />
    </Container>
  );
};

const Container = styled.article`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: ${colors.neutral.background};
    overflow: auto;
    display: flex;
    flex-direction: column;
  `}
`;
