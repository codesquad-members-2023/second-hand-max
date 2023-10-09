import { BackButton as BackButtonStyle } from '@components/BackButton';
import Icons from '@design/Icons';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledBackButton onClick={() => navigate(-1)}>
      <Icons.ChevronLeft />
      <span>닫기</span>
    </StyledBackButton>
  );
};

const StyledBackButton = styled(BackButtonStyle)`
  ${({ theme: { colors } }) => css`
    position: static;
    background: none;
    top: 8px;
    stroke: ${colors.accent.text};
    color: ${colors.accent.text};
  `};
`;
