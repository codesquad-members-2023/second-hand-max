import { Modal } from '@components/Modal/ModalSheet';
import { AddRegionModalHeader } from './AddRegionModalHeader';
import { SearchBar } from './SearchBar';
import { RegionList } from './RegionList';
import { Address } from 'types/region';

type Props = {
  onModalClose: () => void;
  addRegion: (address: Address) => void;
};

export const AddRegionModal: React.FC<Props> = ({
  onModalClose,
  addRegion,
}) => {
  return (
    <Modal onModalClose={onModalClose}>
      <AddRegionModalHeader onModalClose={onModalClose} />
      <SearchBar />
      <RegionList onClick={addRegion} />
    </Modal>
  );
};
