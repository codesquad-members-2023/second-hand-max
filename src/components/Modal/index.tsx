import { useModalStore } from 'stores/useModalStore';
import { RegionModal } from './RegionModal';
import { createPortal } from 'react-dom';
import { AddRegionModal } from './RegionModal/AddRegionModal';

export const ModalOutlet: React.FC<{
  parentElement: HTMLDivElement | null;
}> = ({ parentElement }) => {
  const isRegionModalOpen = useModalStore(
    ({ isRegionModalOpen }) => isRegionModalOpen,
  );
  const isAddRegionModalOpen = useModalStore(
    ({ isAddRegionModalOpen }) => isAddRegionModalOpen,
  );

  return (
    <>
      {isRegionModalOpen &&
        createPortal(<RegionModal />, parentElement ?? document.body)}
      {isAddRegionModalOpen &&
        createPortal(<AddRegionModal />, parentElement ?? document.body)}
    </>
  );
};
