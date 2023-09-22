import { Modal } from '@components/Modal/ModalSheet';
import { AddRegionModalHeader } from './AddRegionModalHeader';
import { SearchBar } from './SearchBar';
import { Address } from 'types/region';
import { useState } from 'react';
import { useRegionInfiniteQuery } from '@hooks/queries/useRegionInfiniteQuery';
import { Loader } from '@components/Loader';
import { RegionList } from './RegionList';
import { useDebounce } from '@hooks/useDebounce';

type Props = {
  onModalClose: () => void;
  addRegion: (address: Address) => void;
};

export const AddRegionModal: React.FC<Props> = ({
  onModalClose,
  addRegion,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const debouncedSearchWord = useDebounce(searchWord, 300);
  const regionQuery = useRegionInfiniteQuery(debouncedSearchWord);

  const onSearchWordChange = (word: string) => setSearchWord(word);

  return (
    <Modal
      onModalClose={onModalClose}
      modalSheetStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AddRegionModalHeader onModalClose={onModalClose} />
      <SearchBar onChange={onSearchWordChange} />

      {regionQuery.isLoading ? (
        <Loader />
      ) : (
        <RegionList
          {...{
            regions: regionQuery.data,
            hasNextPage: regionQuery.hasNextPage,
            isFetchingNextPage: regionQuery.isFetchingNextPage,
            fetchNextPage: regionQuery.fetchNextPage,
            onClick: addRegion,
          }}
        />
      )}
    </Modal>
  );
};
