import Icons from '@design/Icons';
import { styled } from 'styled-components';

const CloseButton: React.FC = () => {
  return (
    <Container type="button" value="cancel" formMethod="dialog">
      <Icons.XCross />
      <span>닫기</span>
    </Container>
  );
};

const Container = styled.button`
  line-height: 0;
`;

export default CloseButton;
