import Button from '@components/Button';
import { DropdownContainer } from '@components/Dropdown';
import { DropdownIndicator } from '@components/Dropdown/DropdownIndicator';
import {
  DropdownMenuItem,
  StyledDropdownMenuItem,
} from '@components/Dropdown/DropdownMenuItem';
import { DropdownMenus } from '@components/Dropdown/DropdownMenus';
import TopBarStyle from '@components/TopBar';
import Icons from '@design/Icons';
import { useEffect, useState } from 'react';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';
import { css, styled } from 'styled-components';

export const Title: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const user = useUserStore(({ user }) => user);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );
  const setIsRegionSettingModalOpen = useModalStore(
    ({ setIsRegionSettingModalOpen }) => setIsRegionSettingModalOpen,
  );

  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);

  const regionMenuOpen = () => setIsRegionMenuOpen(true);
  const regionMenuClose = () => setIsRegionMenuOpen(false);
  const regionSettingModalOpen = () => setIsRegionSettingModalOpen(true);

  useEffect(() => {
    if (user && user.addresses[0]) {
      setCurrentRegion(user.addresses[0]);
    }
  }, []);

  return (
    <TopBar>
      <DropdownContainer>
        <DropdownIndicator onClick={regionMenuOpen}>
          <DropdownText>{currentRegion.addressName}</DropdownText>
          <Icons.ChevronDown />
        </DropdownIndicator>
        {isRegionMenuOpen && (
          <DropdownMenus onClose={regionMenuClose}>
            <DropdownMenuItem onClick={() => {}}>역삼 1동</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>공릉 2동</DropdownMenuItem>
            <SetRegionButton onClick={regionSettingModalOpen}>
              내 동네 설정하기
            </SetRegionButton>
          </DropdownMenus>
        )}
      </DropdownContainer>

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

const DropdownText = styled.div`
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
