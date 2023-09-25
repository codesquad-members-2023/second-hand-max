import Button from '@components/Button';
import PATH from '@constants/PATH';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFound: React.FC = () => {
  return (
    <Container>
      <div>요청한 페이지가 찾을 수 없습니다.</div>
      <Button $flexible="Flexible" $type="Contained">
        <Link to={PATH.BASE}>홈 화면으로 돌아가기</Link>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
