import TopBarStyle from '@components/TopBar';
import { useEffect } from 'react';
import { useUserStore } from 'stores/useUserStore';
import { css, styled } from 'styled-components';
import { RegionDropdown } from './RegionDropdown';
import { CategoryButton } from './CategoryButton';

export const TopBar: React.FC = () => {
  const user = useUserStore(({ user }) => user);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );

  useEffect(() => {
    if (user && user.addresses[0]) {
      setCurrentRegion(user.addresses[0]);
    }
  }, []);

  return (
    <StyledTopBar>
      <RegionDropdown />
      <CategoryButton />
    </StyledTopBar>
  );
};

const StyledTopBar = styled(TopBarStyle)`
  ${({ theme: { fonts, colors } }) => css`
    padding: 8px;
    justify-content: space-between;
    ${fonts.display.strong16};
    z-index: 1;
    background: ${colors.neutral.backgroundBlur};
    backdrop-filter: blur(8px);
    position: absolute;
    top: 0;

    stroke: ${colors.neutral.text};
  `};
`;
