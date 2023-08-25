import TopBar from '@components/TopBar';
import { styled } from 'styled-components';

const Chatting: React.FC = () => {
  return (
    <>
      <Title aria-label="채팅">채팅</Title>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

export default Chatting;
