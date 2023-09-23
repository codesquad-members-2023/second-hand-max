import { Dropdown } from '@components/Dropdown';
import { StyledDropdownMenuItem } from '@components/Dropdown/DropdownMenuItem';
import { useDropdownContext } from '@components/Dropdown/useDropdownContext';
import Icons from '@design/Icons';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';
import styled from 'styled-components';

export const RegionDropdown: React.FC = () => {
  const user = useUserStore(({ user }) => user);
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );
  const openRegionSettingModal = useModalStore(
    ({ openRegionSettingModal }) => openRegionSettingModal,
  );
  const { closeDropdown } = useDropdownContext();

  return (
    <>
      <Dropdown.Indicator>
        <CurrentRegion>{currentRegion.addressName}</CurrentRegion>
        <Icons.ChevronDown />
      </Dropdown.Indicator>

      <Dropdown.Menus>
        {user?.addresses ? (
          user.addresses.map((address) => (
            <Dropdown.MenuItem
              key={address.addressId}
              onClick={() => {
                setCurrentRegion(address);
                closeDropdown();
              }}
            >
              {address.addressName}
            </Dropdown.MenuItem>
          ))
        ) : (
          <Dropdown.MenuItem onClick={closeDropdown}>역삼1동</Dropdown.MenuItem>
        )}

        {user && (
          <SetRegionButton onClick={openRegionSettingModal}>
            내 동네 설정하기
          </SetRegionButton>
        )}
      </Dropdown.Menus>
    </>
  );
};

const CurrentRegion = styled.div`
  padding: 0 8px;
`;

const SetRegionButton = styled(StyledDropdownMenuItem)`
  ${({ theme: { fonts } }) => fonts.available.default16};
`;
