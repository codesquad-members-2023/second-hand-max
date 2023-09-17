import Button from '@components/Button';
import TopBarStyle from '@components/TopBar';
import Icons from '@design/Icons';
import { useEffect } from 'react';
import { useUserStore } from 'stores/useUserStore';
import { css, styled } from 'styled-components';
import { RegionDropdown } from './RegionDropdown';

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

      <IconWrapper>
        <Icons.LayoutGrid />
      </IconWrapper>
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

const IconWrapper = styled(Button)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
