import { Modal } from '@components/Modal/ModalSheet';
import { AddRegionModalHeader } from './AddRegionModalHeader';
import { SearchBar } from './SearchBar';
import { RegionList } from './RegionList';
import { useModalStore } from 'stores/useModalStore';

export const AddRegionModal: React.FC = () => {
  const setIsAddRegionModalOpen = useModalStore(
    ({ setIsAddRegionModalOpen }) => setIsAddRegionModalOpen,
  );

  const onModalClose = () => setIsAddRegionModalOpen(false);

  return (
    <Modal onModalClose={onModalClose}>
      <AddRegionModalHeader onModalClose={onModalClose} />
      <SearchBar />
      <RegionList />
    </Modal>
  );
};
