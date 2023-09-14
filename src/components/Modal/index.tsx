import { useModalStore } from 'stores/useModalStore';
import { RegionModal } from './RegionModal';
import { createPortal } from 'react-dom';

export const ModalOutlet: React.FC<{
  parentElement: HTMLDivElement | null;
}> = ({ parentElement }) => {
  const isRegionModalOpen = useModalStore(
    ({ isRegionModalOpen }) => isRegionModalOpen,
  );

  const portalRoot = parentElement ?? document.body;

  return <>{isRegionModalOpen && createPortal(<RegionModal />, portalRoot)}</>;
};
