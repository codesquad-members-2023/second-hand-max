import { useModalStore } from 'stores/useModalStore';
import { Modal } from '../ModalSheet';
import { RegionModalHeader } from './RegionModalHeader';
import { RegionModalContent } from './RegionModalContent';

export const RegionModal: React.FC = () => {
  const setIsRegionModalOpen = useModalStore(
    ({ setIsRegionModalOpen }) => setIsRegionModalOpen,
  );

  const onModalClose = () => setIsRegionModalOpen(false);

  return (
    <Modal onModalClose={onModalClose}>
      <RegionModalHeader onModalClose={onModalClose} />
      <RegionModalContent />
    </Modal>
  );
};
