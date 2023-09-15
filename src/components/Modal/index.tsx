import { useModalStore } from 'stores/useModalStore';
import { RegionSettingModal } from './RegionSettingModal';
import { createPortal } from 'react-dom';

export const ModalOutlet: React.FC<{
  parentElement: HTMLDivElement | null;
}> = ({ parentElement }) => {
  const isRegionSettingModalOpen = useModalStore(
    ({ isRegionSettingModalOpen }) => isRegionSettingModalOpen,
  );

  const portalRoot = parentElement ?? document.body;

  return (
    <>
      {isRegionSettingModalOpen &&
        createPortal(<RegionSettingModal />, portalRoot)}
    </>
  );
};
