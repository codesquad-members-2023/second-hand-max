import { useModalStore } from 'stores/useModalStore';
import { Modal } from '../ModalSheet';
import { RegionModalHeader } from './RegionModalHeader';
import { RegionModalContent } from './RegionModalContent';

export const RegionModal: React.FC = () => {
  const setIsRegionModalOpen = useModalStore(
    ({ setIsRegionModalOpen }) => setIsRegionModalOpen,
  );
  const setIsAddRegionModalOpen = useModalStore(
    ({ setIsAddRegionModalOpen }) => setIsAddRegionModalOpen,
  );

  const onModalClose = () => setIsRegionModalOpen(false);
  const onAddRegionModalOpen = () => setIsAddRegionModalOpen(true);

  return (
    <Modal onModalClose={onModalClose}>
      <RegionModalHeader onModalClose={onModalClose} />
      <RegionModalContent onAddRegionModalOpen={onAddRegionModalOpen} />
    </Modal>
  );
};
