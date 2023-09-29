import { Modal } from '@components/Modal/ModalSheet';
import { AddRegionModalHeader } from './AddRegionModalHeader';
import { SearchBar } from './SearchBar';
import { Address } from 'types/region';
import { useState } from 'react';
import { useRegionInfiniteQuery } from '@hooks/queries/useRegionInfiniteQuery';
import { Loader } from '@components/Loader';
import { RegionList } from './RegionList';

type Props = {
  onModalClose: () => void;
  addRegion: (address: Address) => void;
};

export const AddRegionModal: React.FC<Props> = ({
  onModalClose,
  addRegion,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const regionQueryResult = useRegionInfiniteQuery(searchWord);

  const updateSearchWord = (word: string) => setSearchWord(word);

  return (
    <Modal
      onModalClose={onModalClose}
      modalSheetStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AddRegionModalHeader onModalClose={onModalClose} />
      <SearchBar updateSearchWord={updateSearchWord} />

      {regionQueryResult.isLoading ? (
        <Loader />
      ) : (
        <RegionList
          {...{
            ...regionQueryResult,
            regions: regionQueryResult.data,
            onClick: addRegion,
          }}
        />
      )}
    </Modal>
  );
};
