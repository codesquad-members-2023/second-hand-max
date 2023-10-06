import { BackButton as BackButtonStyle } from '@components/BackButton';
import TopBarStyle from '@components/TopBar';
import Icons from '@design/Icons';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

type Props = {
  chatPartnerName: string;
};

export const TopBar: React.FC<Props> = ({ chatPartnerName }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <Icons.ChevronLeft />
        <span>뒤로</span>
      </BackButton>
      <span>{chatPartnerName}</span>
      <MenuButton>
        <Icons.Dots />
      </MenuButton>
    </Container>
  );
};

const Container = styled(TopBarStyle)`
  ${({ theme: { fonts, colors } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 56px;
    flex-shrink: 0;
    ${fonts.display.strong16}
    stroke: ${colors.neutral.text};
  `}
`;

const BackButton = styled(BackButtonStyle)`
  position: static;
`;

const MenuButton = styled.div`
  padding: 8px;
`;
