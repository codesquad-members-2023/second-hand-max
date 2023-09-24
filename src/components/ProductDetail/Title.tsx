import { BackButton as BackButtonStyle } from '@components/BackButton';
import Icons from '@design/Icons';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

const Title: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <Icons.ChevronLeft />
        <span>닫기</span>
      </BackButton>
    </Container>
  );
};

const Container = styled.h1`
  ${({ theme: { dimensions } }) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: ${dimensions.topBarHeight};
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  `};
`;

const BackButton = styled(BackButtonStyle)`
  ${({ theme: { colors } }) => css`
    stroke: ${colors.accent.text};
    color: ${colors.accent.text};
  `};
`;

export default Title;
