import TopBar from '@components/TopBar';
import { styled } from 'styled-components';
import { ChatList } from './ChatList';
import { Route, Routes } from 'react-router-dom';
import { ChatRoom, NewChatRoom } from './ChatRoom';

const Chatting: React.FC = () => {
  return (
    <>
      <Title aria-label="채팅">채팅</Title>
      <ChatList />
      <Routes>
        <Route path={'/new-chat'} element={<NewChatRoom />} />
        <Route path={'/:chatRoomId'} element={<ChatRoom />} />
      </Routes>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

export default Chatting;
