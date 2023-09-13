import { useModalStore } from 'stores/useModalStore';
import { Modal } from '../ModalSheet';
import { RegionModalHeader } from './RegionModalHeader';
import { useState } from 'react';
import { AddRegionModal } from './AddRegionModal';
import { RegionModalContent } from './RegionModalContent';

export const RegionModal: React.FC = () => {
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);
  const setIsRegionModalOpen = useModalStore(
    ({ setIsRegionModalOpen }) => setIsRegionModalOpen,
  );

  const onModalClose = () => setIsRegionModalOpen(false);
  const onAddRegionModalOpen = () => setIsAddRegionModalOpen(true);
  const onAddRegionModalClose = () => setIsAddRegionModalOpen(false);

  return (
    <Modal onModalClose={onModalClose}>
      <RegionModalHeader onModalClose={onModalClose} />
      <RegionModalContent onAddRegionModalOpen={onAddRegionModalOpen} />
      {isAddRegionModalOpen && (
        <AddRegionModal onAddRegionModalClose={onAddRegionModalClose} />
      )}
    </Modal>
  );
};
