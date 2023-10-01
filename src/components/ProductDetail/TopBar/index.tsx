import { css, styled } from 'styled-components';
import { BackButton } from './BackButton';
import { MenuButton } from './MenuButton';

type Props = {
  itemId: string;
  isSeller: boolean;
};

export const TopBar: React.FC<Props> = ({ itemId, isSeller }) => {
  return (
    <Sticky>
      <TopBarContainer>
        <BackButton />
        {isSeller && <MenuButton itemId={itemId} />}
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
    justify-content: space-between;
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
