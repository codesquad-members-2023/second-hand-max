import { BackButton } from '@components/BackButton';
import TopBar from '@components/TopBar';
import Icons from '@design/Icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Title: React.FC = () => {
  const navigate = useNavigate();

  return (
    <TopBar>
      <BackButton onClick={() => navigate(-1)}>
        <Icons.ChevronLeft />
      </BackButton>
      <TitleText>채팅목록</TitleText>
    </TopBar>
  );
};

const TitleText = styled.div`
  margin: 40px;
`;
