import TopBar from '@components/TopBar';
import { styled } from 'styled-components';

const MyAccount: React.FC = () => {
  return (
    <>
      <TopBar aria-label="내 계정">
        <Title>내 계정</Title>
      </TopBar>
    </>
  );
};

const Title = styled.h2`
  width: 100%;

  display: flex;
  justify-content: center;

  ${({ theme: { fonts } }) => fonts.display.strong16}
`;

export default MyAccount;
