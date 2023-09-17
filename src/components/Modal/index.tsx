import { useModalStore } from 'stores/useModalStore';
import { RegionSettingModal } from './RegionSettingModal';
import { createPortal } from 'react-dom';
import { CategoryModal } from './CategoryModal';

export const ModalOutlet: React.FC<{
  parentElement: HTMLDivElement | null;
}> = ({ parentElement }) => {
  const isRegionSettingModalOpen = useModalStore(
    ({ isRegionSettingModalOpen }) => isRegionSettingModalOpen,
  );
  const isCategoryModalOpen = useModalStore(
    ({ isCategoryModalOpen }) => isCategoryModalOpen,
  );

  const portalRoot = parentElement ?? document.body;

  return (
    <>
      {isRegionSettingModalOpen &&
        createPortal(<RegionSettingModal />, portalRoot)}
      {isCategoryModalOpen && createPortal(<CategoryModal />, portalRoot)}
    </>
  );
};
