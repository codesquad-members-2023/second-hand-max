import Button from '@components/Button';
import { Dropdown } from '@components/Dropdown';
import { StyledDropdownMenuItem } from '@components/Dropdown/DropdownMenuItem';
import TopBarStyle from '@components/TopBar';
import Icons from '@design/Icons';
import { useEffect } from 'react';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';
import { css, styled } from 'styled-components';

export const Title: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const user = useUserStore(({ user }) => user);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );
  const openRegionSettingModal = useModalStore(
    ({ openRegionSettingModal }) => openRegionSettingModal,
  );

  useEffect(() => {
    if (user && user.addresses[0]) {
      setCurrentRegion(user.addresses[0]);
    }
  }, []);

  return (
    <TopBar>
      <Dropdown>
        <Dropdown.Indicator>
          <CurrentRegion>{currentRegion.addressName}</CurrentRegion>
          <Icons.ChevronDown />
        </Dropdown.Indicator>
        <Dropdown.Menus>
          <Dropdown.MenuItem onClick={() => {}}>역삼 1동</Dropdown.MenuItem>
          <Dropdown.MenuItem onClick={() => {}}>공릉 2동</Dropdown.MenuItem>
          <SetRegionButton onClick={openRegionSettingModal}>
            내 동네 설정하기
          </SetRegionButton>
        </Dropdown.Menus>
      </Dropdown>

      <IconWrapper>
        <Icons.LayoutGrid />
      </IconWrapper>
    </TopBar>
  );
};

const TopBar = styled(TopBarStyle)`
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

const CurrentRegion = styled.div`
  padding: 0 8px;
`;

const SetRegionButton = styled(StyledDropdownMenuItem)`
  ${({ theme: { fonts } }) => fonts.available.default16};
`;

const IconWrapper = styled(Button)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
