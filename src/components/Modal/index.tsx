import { useModalStore } from 'stores/useModalStore';
import { RegionModal } from './RegionModal';
import { createPortal } from 'react-dom';

export const ModalOutlet: React.FC<{
  parentElement: HTMLDivElement | null;
}> = ({ parentElement }) => {
  const isRegionModalOpen = useModalStore(
    ({ isRegionModalOpen }) => isRegionModalOpen,
  );

  return (
    <>
      {isRegionModalOpen &&
        createPortal(<RegionModal />, parentElement ?? document.body)}
    </>
  );
};
