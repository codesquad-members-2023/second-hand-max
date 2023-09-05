import Icons from '@design/Icons';
import { styled } from 'styled-components';

const CloseButton: React.FC<{ blind?: boolean }> = ({ blind }) => {
  return (
    <Container type="button" value="cancel" formMethod="dialog">
      <Icons.XCross />
      <span className={blind ? '' : 'blind'}>닫기</span>
    </Container>
  );
};

const Container = styled.button`
  line-height: 0;
`;

export default CloseButton;
