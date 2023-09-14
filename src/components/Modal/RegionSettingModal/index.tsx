import { useModalStore } from 'stores/useModalStore';
import { Modal } from '../ModalSheet';
import { RegionModalHeader } from './RegionModalHeader';
import { RegionModalContent } from './RegionModalContent';

export const RegionSettingModal: React.FC = () => {
  const setIsRegionSettingModalOpen = useModalStore(
    ({ setIsRegionSettingModalOpen }) => setIsRegionSettingModalOpen,
  );

  const onModalClose = () => setIsRegionSettingModalOpen(false);

  return (
    <Modal onModalClose={onModalClose}>
      <RegionModalHeader onModalClose={onModalClose} />
      <RegionModalContent />
    </Modal>
  );
};
