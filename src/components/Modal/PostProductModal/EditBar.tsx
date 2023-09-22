import BottomBar from '@components/BottomBar';
import Icons from '@design/Icons';
import styled from 'styled-components';
import { useModalStore } from 'stores/useModalStore';
import { useUserStore } from 'stores/useUserStore';

export const EditBar: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const openRegionSettingModal = useModalStore(
    ({ openRegionSettingModal }) => openRegionSettingModal,
  );

  return (
    <StyleEditBar onClick={openRegionSettingModal}>
      <Icons.MapPinFilled />
      <div>{currentRegion.addressName}</div>
    </StyleEditBar>
  );
};

const StyleEditBar = styled(BottomBar)`
  padding: 16px;
  gap: 8px;
  cursor: pointer;
`;
