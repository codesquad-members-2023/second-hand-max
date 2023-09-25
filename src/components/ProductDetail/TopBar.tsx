import { BackButton as BackButtonStyle } from '@components/BackButton';
import Icons from '@design/Icons';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

export const TopBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Sticky>
      <TopBarContainer>
        <BackButton onClick={() => navigate(-1)}>
          <Icons.ChevronLeft />
          <span>닫기</span>
        </BackButton>
      </TopBarContainer>
    </Sticky>
  );
};

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
`;

const TopBarContainer = styled.h1`
  ${({ theme: { dimensions } }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${dimensions.topBarHeight};

    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0) 100%
    );
  `};
`;

const BackButton = styled(BackButtonStyle)`
  ${({ theme: { colors } }) => css`
    background: none;
    top: 8px;
    stroke: ${colors.accent.text};
    color: ${colors.accent.text};
  `};
`;
