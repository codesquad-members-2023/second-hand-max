import { useModalStore } from 'stores/useModalStore';
import { RegionSettingModal } from './RegionSettingModal';
import { createPortal } from 'react-dom';
import { CategoryModal } from './CategoryModal';
import { NewProductModal } from './NewProductModal';

export const ModalOutlet: React.FC<{
  parentElement: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ parentElement }) => {
  const isRegionSettingModalOpen = useModalStore(
    ({ isRegionSettingModalOpen }) => isRegionSettingModalOpen,
  );
  const isCategoryModalOpen = useModalStore(
    ({ isCategoryModalOpen }) => isCategoryModalOpen,
  );
  const isNewProductModalOpen = useModalStore(
    ({ isNewProductModalOpen }) => isNewProductModalOpen,
  );

  const portalRoot = parentElement.current ?? document.body;

  return (
    <>
      {isRegionSettingModalOpen &&
        createPortal(<RegionSettingModal />, portalRoot)}
      {isCategoryModalOpen && createPortal(<CategoryModal />, portalRoot)}
      {isNewProductModalOpen && createPortal(<NewProductModal />, portalRoot)}
    </>
  );
};
