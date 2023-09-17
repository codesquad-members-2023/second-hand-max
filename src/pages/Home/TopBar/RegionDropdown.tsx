import { Dropdown } from '@components/Dropdown';
import { StyledDropdownMenuItem } from '@components/Dropdown/DropdownMenuItem';
import Icons from '@design/Icons';
import { useState } from 'react';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';
import styled from 'styled-components';

export const RegionDropdown: React.FC = () => {
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const openRegionSettingModal = useModalStore(
    ({ openRegionSettingModal }) => openRegionSettingModal,
  );

  const regionMenuOpen = () => setIsRegionMenuOpen(true);
  const regionMenuClose = () => setIsRegionMenuOpen(false);

  return (
    <Dropdown>
      <Dropdown.Indicator onClick={regionMenuOpen}>
        <CurrentRegion>{currentRegion.addressName}</CurrentRegion>
        <Icons.ChevronDown />
      </Dropdown.Indicator>
      {isRegionMenuOpen && (
        <Dropdown.Menus onClose={regionMenuClose}>
          <Dropdown.MenuItem onClick={() => {}}>역삼 1동</Dropdown.MenuItem>
          <Dropdown.MenuItem onClick={() => {}}>공릉 2동</Dropdown.MenuItem>
          <SetRegionButton onClick={openRegionSettingModal}>
            내 동네 설정하기
          </SetRegionButton>
        </Dropdown.Menus>
      )}
    </Dropdown>
  );
};

const CurrentRegion = styled.div`
  padding: 0 8px;
`;

const SetRegionButton = styled(StyledDropdownMenuItem)`
  ${({ theme: { fonts } }) => fonts.available.default16};
`;
