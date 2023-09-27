import Button from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';
import { AddedRegionItem } from '../AddedRegionItem';
import { useUserStore } from 'stores/useUserStore';
import { useState } from 'react';
import { AddRegionModal } from './AddRegionModal';
import { addRegion } from 'apis/region';

export const RegionModalContent: React.FC = () => {
  const { addresses } = useUserStore(({ getUser }) => getUser());
  const addUserAddress = useUserStore(({ addUserAddress }) => addUserAddress);
  const deleteUserAddress = useUserStore(
    ({ deleteUserAddress }) => deleteUserAddress,
  );

  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);

  const onAddRegionModalOpen = () => setIsAddRegionModalOpen(true);
  const onAddRegionModalClose = () => setIsAddRegionModalOpen(false);

  return (
    <Content>
      <Notice>
        지역은 최소 1개,
        <br />
        최대 2개까지 설정 가능해요.
      </Notice>
      <AddedRegions>
        {addresses.map((address) => (
          <AddedRegionItem
            key={address.addressId}
            {...{
              addressName: address.addressName,
              onDeleteButtonClick: () => deleteUserAddress(address.addressId),
            }}
          />
        ))}
        <AddRegion
          onClick={onAddRegionModalOpen}
          disabled={addresses.length >= 2}
        >
          <Icons.Plus />
          <span>추가</span>
        </AddRegion>
      </AddedRegions>
      {isAddRegionModalOpen && (
        <AddRegionModal
          {...{
            onModalClose: onAddRegionModalClose,
            addRegion: (address) => {
              try {
                addUserAddress(address);
                addRegion(address.addressId);
                onAddRegionModalClose();
              } catch (error) {
                if (error instanceof Error) {
                  alert(error.message);
                }
              }
            },
          }}
        />
      )}
    </Content>
  );
};

const Content = styled.div`
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Notice = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.default12};
    color: ${colors.neutral.text};
    text-align: center;
  `}
`;

const AddedRegions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddRegion = styled(Button)`
  ${({ theme: { fonts, colors, radius } }) => css`
    width: 100%;
    height: 100%;
    border-radius: ${radius.medium};
    border: 0.8px solid ${colors.neutral.border};
    padding: 16px;
    ${fonts.available.strong16};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    stroke: ${colors.neutral.text};
  `}
`;
