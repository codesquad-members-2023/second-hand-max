import { useModalStore } from 'stores/useModalStore';
import { Modal } from '../ModalSheet';
import { RegionModalHeader } from './RegionModalHeader';
import { RegionModalContent } from './RegionModalContent';

export const RegionSettingModal: React.FC = () => {
  const closeRegionSettingModal = useModalStore(
    ({ closeRegionSettingModal }) => closeRegionSettingModal,
  );

  return (
    <Modal onModalClose={closeRegionSettingModal}>
      <RegionModalHeader onModalClose={closeRegionSettingModal} />
      <RegionModalContent />
    </Modal>
  );
};
