import { Modal } from '@components/Modal/ModalSheet';
import { AddRegionModalHeader } from './AddRegionModalHeader';
import { SearchBar } from './SearchBar';
import { RegionList } from './RegionList';

export const AddRegionModal: React.FC<{
  onAddRegionModalClose: () => void;
}> = ({ onAddRegionModalClose }) => {
  return (
    <Modal>
      <AddRegionModalHeader onModalClose={onAddRegionModalClose} />
      <SearchBar />
      <RegionList />
    </Modal>
  );
};
