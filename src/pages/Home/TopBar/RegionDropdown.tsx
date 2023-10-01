import { Dropdown } from '@components/Dropdown';
import { StyledDropdownMenuItem } from '@components/Dropdown/DropdownMenuItem';
import { useDropdownContext } from '@components/Dropdown/useDropdownContext';
import Icons from '@design/Icons';
import { useRegionSelectMutation } from '@hooks/queries/useRegionSelectMutation';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';
import styled, { css } from 'styled-components';

export const RegionDropdown: React.FC = () => {
  const user = useUserStore(({ user }) => user);

  // 이거 회원 동네 목록 조회 API로 교체하기 query 날리기
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  // const { data: addresses, isError, currentRegion } = useUserAddressQuery();

  const openRegionSettingModal = useModalStore(
    ({ openRegionSettingModal }) => openRegionSettingModal,
  );
  const { mutate: selectRegion } = useRegionSelectMutation();

  const { isDropdownOpen, closeDropdown } = useDropdownContext();

  // if (isError) {
  //   return <ErrorPage />;
  // }

  return (
    <>
      <Dropdown.Indicator>
        <CurrentRegion>
          {currentRegion.addressName}
          {/* {currentRegion?.addressName ?? addresses?.[0]!.addressName} */}
        </CurrentRegion>
        <Icons.ChevronDown />
      </Dropdown.Indicator>

      {isDropdownOpen && (
        <Dropdown.Menus>
          {!user ? (
            <Dropdown.MenuItem onClick={closeDropdown}>
              역삼1동
            </Dropdown.MenuItem>
          ) : (
            user.addresses.map((address) => (
              <Dropdown.MenuItem
                key={address.addressId}
                onClick={() => {
                  selectRegion(address.addressId);
                  closeDropdown();
                }}
              >
                <UserAddressItem
                  $isSelected={address.addressId === currentRegion.addressId}
                >
                  {address.addressName}
                </UserAddressItem>
              </Dropdown.MenuItem>
            ))
          )}

          {user && (
            <StyledDropdownMenuItem onClick={openRegionSettingModal}>
              내 동네 설정하기
            </StyledDropdownMenuItem>
          )}
        </Dropdown.Menus>
      )}
    </>
  );
};

const CurrentRegion = styled.div`
  padding: 0 8px;
`;

const UserAddressItem = styled.div<{ $isSelected: boolean }>`
  ${({ theme: { fonts }, $isSelected }) => css`
    ${$isSelected && fonts.enabled.strong16};
  `};
`;
